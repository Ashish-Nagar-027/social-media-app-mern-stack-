const { default: mongoose } = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");

const cloudinary = require("cloudinary");

// create new post
const createPost = async (req, res) => {

  try {
    const userInfo = await User.findById(req.user.id);
 

    let createdPost = {};

    if (req.files) {
      let file = req.files.image;

      let result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: "User",
      });

      createdPost.imageUrl = {
        public_Id: result.public_id,
        url: result.secure_url,
      };
    }

    const { caption } = req.body;
    createdPost.caption = caption;

    createdPost.user = {
      name: userInfo.name,
      profilePic: userInfo.profilePic,
      userId: userInfo.id,
    };

    const post = await Post.create(createdPost);

    await userInfo.updateOne({
      $push: { posts: post.id },
    });

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a Post
const getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      throw Error("please send post id to get post");
    }

    if (!mongoose.isValidObjectId(postId)) {
      throw Error("please send valid post id to get post");
    }

    const post = await Post.findById(postId);
    if (!post) {
      res.status(403).json("post not found");
    }

    if (post.user.userId.toString() === req.user.id) {
      res.status(200).json({ post });
    } else {
      throw Error({
        message: "Access Denied! user can only get there own posts",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// update a Post
const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      throw Error("please send post id ");
    }

    if (!mongoose.isValidObjectId(postId)) {
      throw Error("please send valid post id to update post");
    }

    const post = await Post.findById(postId);
    if (!post) {
      res.status(403).json("post not found");
    }

    if (post.user.userId.toString() === req.user.id) {
      const updatedPost = await post.updateOne({
        $set: { caption: req.body.caption, userId: post.user.userId },
      });

      res
        .status(200)
        .json({ updatedPost, message: "Post updated successfully" });
    } else {
      throw Error({
        message: "Action forbidden! Users can only update their own posts ",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete post
const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      throw Error("please send post id to delete");
    }

    if (!mongoose.isValidObjectId(postId)) {
      throw Error("please send valid post id to delete post");
    }

    const post = await Post.findById(postId);
    if (!post) {
      res.status(403).json("post not found");
    }

    if (post.user.userId.toString() === req.user.id) {
      await post.deleteOne();

      await User.updateOne(
        { _id: req.user.id },
        {
          $pull: { posts: post.id },
        }
      );

      res.status(200).json("post has been deleted");
    } else {
      throw Error({
        message: "Actions forbidden ! You can only delete your own posts",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

///======================
// like or unlike post
///=====================
const likeOrUnlike = async (req, res) => {
  try {
    const postId = req.params.id;
    const { userId } = req.body;
    if (!postId) {
      throw Error("please send post id to like in params");
    }
    if (!userId) {
      throw Error("please send user id who wants to like the post");
    }

    if (!mongoose.isValidObjectId(postId)) {
      throw Error("post id is not valid id");
    }
    if (!mongoose.isValidObjectId(userId)) {
      throw Error("userId is not valid");
    }

    const post = await Post.findById(postId);
    if (!post) {
      res.status(403).json("post not found");
    }

    let message;

    if (!post.likes.includes(userId)) {
      await post.updateOne({
        $push: { likes: userId },
      });
      message = "your like added";
    } else {
      await post.updateOne({
        $pull: { likes: userId },
      });
      message = "your like removed";
    }

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


///======================
// Get TimeLine posts
///=====================
const timeLinePosts = async (req, res) => {
  try {

    const currentUser = await User.findById(req.params.id).select(
      "profilePic name followings"
    );
    

    if(currentUser?.followings.length === 0) {
     const userPosts = await Post.find();
     return  res.status(200).json(userPosts);
    }
    

    const { name, profilePic, id } = currentUser;
    const userPosts = await Post.find({ "user.userId": currentUser.id });
    const currentUserPosts = userPosts.map((post) => {
      const { _id, caption, likes, comments, createdAt, updatedAt, imageUrl } =
        post;

      return {
        _id,
        caption,
        likes,
        comments,
        createdAt,
        updatedAt,
        imageUrl,

        user: { name, profilePic, userId: id },
      };
    });

    const followingsPosts = await Promise.all(
      currentUser.followings.map((followerId) => {
        return Post.find({ "user.userId": followerId });
      })
    );

    const flattenedArr = [].concat(...followingsPosts);
    const addUserInPosts = await Promise.all(
      flattenedArr.map(async (post) => {
        const postUser = await User.findById(post.user.userId).select(
          "profilePic name id"
        );
        const { id, name, profilePic } = postUser;

        const {
          _id,
          caption,
          likes,
          comments,
          createdAt,
          updatedAt,
          imageUrl,
        } = post;

        return {
          _id,
          caption,
          likes,
          comments,
          createdAt,
          updatedAt,
          imageUrl,
          user: { userId: id, name, profilePic },
        };
      })
    );

    const posts = currentUserPosts.concat(addUserInPosts).sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // filtering duplicate posts============
    const uniqueItems = {};
    const result = [];

    for (const item of posts) {
      const key = item._id;
      if (!uniqueItems[key]) {
        uniqueItems[key] = true;
        result.push(item);
      }
    }


    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

///======================
// Get user all  posts
///=====================

const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.id;

       const user = await User.findById(userId);
    const userPosts = await Promise.all(
      user.posts.map(async (postId) => {
        let post = await Post.findById(postId)
        post =  post.toObject()
        post.user = { ...post.user, profilePic: user.profilePic };
        return post 
      })
    );

    res.status(200).json(userPosts); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};






///======================
//  add Bookmark post
///=====================
const bookmarkPost = async (req, res) => {
  try {
    const postId = req.params.id;
    
    if (!postId) {
      throw Error("please send post id to like in params");
    }

    if (!mongoose.isValidObjectId(postId)) {
      throw Error("post id is not valid id");
    }
   

    const post = await Post.findById(postId);
    const user = await User.findById(req.user.id);
    if (!post) {
      res.status(403).json("post not found");
    }

    let message;

    if (!user.bookmarkedPosts.includes(postId)) {
      await user.updateOne({
        $push: { bookmarkedPosts: postId },
      });
      message = "Post bookmarked added";
    } else {
      await user.updateOne({
        $pull: { bookmarkedPosts: postId },
      });
      message = "post bookmarked removed";
    }

    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



///======================
// Get user bookmarked posts
///=====================
const getUserBookmarkedPosts = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    const userPosts = await Promise.all(
      user.bookmarkedPosts.map(async (postId) => {
        let post = await Post.findById(postId)
        post = post.toObject()
        let postUser = await User.findById(post.user.userId)
        post.user = { ...post.user, profilePic: postUser.profilePic };
        console.log('postuser ' , postUser.profilePic)
        return post
      })
    );

    // console.log('new post ',userPosts)


    res.status(200).json(userPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



///======================
// Get all  posts
///=====================
const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({}).sort({
      createdAt: -1,
    });

    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

///======================
// add comment
///=====================
const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { comment } = req.body;
    const userInfo = req.user;

    if (!postId) {
      throw Error("please send post id to like in params");
    }
    if (!comment) {
      throw Error("please send comment text");
    }

    if (!mongoose.isValidObjectId(postId)) {
      throw Error("post id is not valid id");
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(403).json("post not found");
    }

    const commentInfo = {
      user: {
        name: userInfo.name,
        avtar: userInfo.avtar,
        userId: userInfo.id,
      },
      comment,
    };

    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: commentInfo } },
      { new: true }
    );

    res.status(200).json({
      message: "you comment added",
      comment: updatedPost.comments[updatedPost.comments.length - 1],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

///======================
// delete comment
///=====================
const deleteComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { commentId } = req.body;
    if (!postId) {
      throw Error("please send post id to like in params");
    }
    if (!commentId) {
      throw Error("please send comment text");
    }

    if (!mongoose.isValidObjectId(postId)) {
      throw Error("post id is not valid id");
    }
    if (!mongoose.isValidObjectId(commentId)) {
      throw Error("post id is not valid id");
    }

  console.log('postId ',postId)
  console.log('commentId ',commentId)


    const post = await Post.findById(postId);
    if (!post) {
      return res.status(403).json("post not found");
    }

    await post.comments.pull(commentId);

     await post.save();

    res.status(200).json({
      message: "you comment deleted",
      commentId: commentId
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
  likeOrUnlike,
  timeLinePosts,
  getUserPosts,
  getAllPosts,
  addComment,
  bookmarkPost,
  getUserBookmarkedPosts ,
  deleteComment

};
