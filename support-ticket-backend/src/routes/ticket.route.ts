import { Router } from "express";

import {
  createTicketPost,
  deleteTicketPost,
  getAllTicketPosts,
  getSingleTicketPost,
  updateTicketPost,
  getAllTicketPostSearchByArea,
  getAllTicketPostSearchByModel,
  replyTicketPost
} from "../controller/ticket.controller";

const router = Router();

// get all Ticket post
router.get("/all", getAllTicketPosts);

// get single Ticket Post
router.get("/single/:id", getSingleTicketPost);

// get all Ticket post serach by area
router.get("/allAreaTicketPosts/:area", getAllTicketPostSearchByArea);

// get all Ticket post serach by Ammount

// get all Ticket post serach by Model
router.get("/allGroupTicketPosts/:model", getAllTicketPostSearchByModel);

// create new Ticket Post
router.post("/create", createTicketPost);

// add reply to the msg
router.post("/reply-msg/:id", replyTicketPost);

// update Ticket post
router.put("/update-post/:id", updateTicketPost);

//delete Ticket post
router.delete("/delete/:id", deleteTicketPost);

export default router;
