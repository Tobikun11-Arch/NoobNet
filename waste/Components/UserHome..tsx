import "./Customize Css/userInfo.css";
import React, { useState, useEffect, Profiler } from "react";
import { useLocation } from "react-router-dom";
import {
  getStorage,
  ref as storageReference,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import IconComment from "./Svg Icons/IconComment.tsx";
import IconThreeDots from "./Svg Icons/IconThreeDots.tsx";
import IconImageAlt from "./Svg Icons/IconImageAlt.tsx";
import { getFirestore, collection, addDoc, getDocs, onSnapshot } from "firebase/firestore";
import IconMessage from "./Svg Icons/IconMessage.tsx";
import IconCloseCircle from "./Svg Icons/IconCloseCircle.tsx";
import IconSend from './Svg Icons/IconSend.tsx'
import { ImProfile } from "react-icons/im";

interface Post {
  userId: string | null;
  text: string;
  imageUrl: string | null;
  userProfilePicture: string | null;
}

interface Comment {

  context: string;
  profile: string | null;
  Fname: string;

}

function UserHome() {
  const Location = useLocation();
  const { user } = Location.state;

  const storage = getStorage();

  const [ImageValue, setImage] = useState<string | null>(null);

  //For Profile picture --->
  useEffect(() => {
    const checkProfilePicture = async () => {
      try {
        const fileName = `${user.FullName}-profile-picture.jpg`;
        const storageRef = storageReference(
          storage,
          `profile_pictures/${fileName}`
        );
        const profilePictureUrl = await getDownloadURL(storageRef);

        setImage(profilePictureUrl);
      } catch (error) {
        console.log(error);
      }
    };

    checkProfilePicture();
  }, [storage, user.FullName]);

  //For uploading post

  const [showUpload, setUpload] = useState(false);

  const HandlePost = () => {
    setUpload(true);
  };

  const handleClose = () => {
    setUpload(false);
  };

  //Upload photos

  const [ImageValues, setImages] = useState<string | null>(null);

  const HandleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const urlImage = URL.createObjectURL(e.target.files[0]);
      const file = e.target.files[0];
      setImages(urlImage);

      const storageRef = storageReference(
        storage,
        `Post/${user.FullName}/${file.name}`
      );
      await uploadBytes(storageRef, file);
    }
  };

  //post area
  const db = getFirestore();

  const [postText, setPostText] = useState<string>("");
  const [posts, setPosts] = useState<
    Array<{
      text: string;
      imageUrl: string | null;
      userProfilePicture: string | null;
      userId: string | null;
    }>
  >([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsData: Post[] = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const userProfilePictureUrl = await getDownloadURL(
            storageReference(
              storage,
              `profile_pictures/${data.userId}-profile-picture.jpg`
            )
          );
          return {
            userProfilePicture: userProfilePictureUrl,
            userId: data.userId,
            text: data.text,
            imageUrl: data.imageUrl,
          } as Post;
        })
      );
      setPosts(postsData);
    };

    fetchPosts();
  }, [db, storage]);


  const handlePostSubmit = async () => {
    let uploadedImageUrl: string | null = null;
    const fileInput = document.getElementById("Image") as HTMLInputElement;

    if (ImageValues && fileInput.files) {
      const file = fileInput.files[0];
      const storageRef = storageReference(
        storage,
        `posts/${user.FullName}/${file.name}`
      );
      await uploadBytes(storageRef, file);
      uploadedImageUrl = await getDownloadURL(storageRef);
    }

    const newPost: Post = {
      userId: user.FullName,
      text: postText,
      imageUrl: uploadedImageUrl,
      userProfilePicture: ImageValue,
    };

    await addDoc(collection(db, "posts"), newPost);

    setPosts([newPost, ...posts]);
    setPostText("");
    setImages(null);
    setUpload(false);
  };


  //send comment  -->
  const [comments, setCommentss] = useState<Comment[]>([]);
const [comment, setCommentz] = useState<string>(""); 

useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, "Comments"), (snapshot) => {
    const commentsData = snapshot.docs.map(doc => doc.data() as Comment);
    setCommentss(commentsData);
  });

  // Cleanup the listener on unmount
  return () => unsubscribe();
}, [db]);



  const Profile = ImageValue;
  const FullNames = user.FullName;

  const HandleCommentForm = async (e:React.FormEvent) => {

    e.preventDefault();
    await HandleComment;

  }

const HandleComment = async () => {
  const newComment = {
    context: comment,
    profile: Profile,
    Fname: FullNames,
  };


  // Add the new comment to Firestore
  await addDoc(collection(db, "Comments"), newComment);


  // Clear the comment input
  setCommentz("");
};



  //Comments show

  const [isComment, setComment] = useState(false);

  const ShowComment = () => setComment(true);
  const CloseComments = () => setComment(false);

  return (
    <>
      <body>
        <div className="wrapper">
          <div className="header">
            <input
              type="text"
              placeholder="Awkward Ideas"
              onClick={HandlePost}
            />
          </div>{" "}
          {/**header closse */}
          <main>
            {showUpload && (
              <>
                <div className="box">
                  <div className="Details">
                    <div
                      className="profileBox"
                      style={{
                        backgroundImage: ImageValue
                          ? `url(${ImageValue})`
                          : "block",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>

                    <p id="name">{user.Username}</p>

                    <div className="dots">
                      <IconThreeDots />
                    </div>
                  </div>

                  <textarea
                    id="postingArea"
                    placeholder="Weird ideas..."
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                  />

                  <div className="Upload-area">
                    <input
                      id="Image"
                      type="file"
                      onChange={HandleImage}
                      style={{ display: "none" }}
                    />

                    <div
                      className="ImageUps"
                      onClick={() => document.getElementById("Image")?.click()}
                    >
                      {" "}
                      <IconImageAlt />
                    </div>

                    <div
                      className="UploadedImage"
                      style={{
                        backgroundImage: ImageValues
                          ? `url(${ImageValues})`
                          : "block",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>

                    <button className="UploadNow" onClick={handlePostSubmit}>
                      Post
                    </button>
                  </div>
                </div>

                <h1 className="closePost" onClick={handleClose}>
                  X
                </h1>
              </>
            )}

            {/* Display posts */}
            <div className="posts">
              {posts.map((post, index) => (
                <div key={index} className="post">
                  <div className="post-header">
                    <div
                      className="profile-picture"
                      style={{
                        backgroundImage: post.userProfilePicture
                          ? `url(${post.userProfilePicture})`
                          : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>

                    <p className="postname">{post.userId}</p>
                  </div>

                  <p>{post.text}</p>
                  {post.imageUrl && (
                    <div
                      className="postImage"
                      style={{
                        backgroundImage: `url(${post.imageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                  )}

                  <div className="Comment" onClick={ShowComment}>
                    <IconComment />
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
        {/**wrapper enddd */}

        <footer>
          {isComment && (
            <>
              <div className="CommentBox">
                <div className="close">
                  <p>Comments</p>
                  <div className="Icon" onClick={CloseComments}>
                    <IconCloseCircle />
                  </div>
                </div>

                <div className="CommentMain">
                 
                {comments.map((comm, index) => (

                  <div key={index} className="seeComment">
                  
                  <div
                    className="profileBox"
                    style={{
                      backgroundImage: comm.profile
                        ? `url(${comm.profile})`
                        : "block",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>

              
                  <p className="Myname">{comm.Fname} <br /> <span id="Comsec">{comm.context}</span></p>
                  
                  

                  </div>

                ))}

                </div>



                <div className="CommentFooter">

                  <div
                    className="profileBox"
                    style={{
                      backgroundImage: ImageValue
                        ? `url(${ImageValue})`
                        : "block",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  
                  <input type="text" className="CommentType" placeholder="Comment..." value={comment} onChange={(e) => setCommentz(e.target.value)}/>

                    <form onSubmit={HandleCommentForm}>
                  <button className="buttonCom" type="submit"><IconSend /></button>
                  </form>

                </div>
              </div>{" "}
              {/**Comment box close */}
            </>
          )}

          <div
            className="profileBox"
            style={{
              backgroundImage: ImageValue ? `url(${ImageValue})` : "block",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <input type="text" placeholder="Search" />

          <div className="messages">
            <IconMessage />
          </div>
        </footer>
      </body>
    </>
  );
}

export default UserHome;
