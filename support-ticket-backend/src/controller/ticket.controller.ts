import { NextFunction, Request, Response } from "express";

import Ticket from "../model/ticket.model";

// Get all Ticket posts and count the status of each
export const getAllTicketPosts = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get all tickets and sort them by name
    const posts = await Ticket.find({}).sort({ name: -1 });

    // Count the number of tickets for each status
    const ticketStats = await Ticket.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1
        }
      }
    ]);

    // Default counts
    const stats = {
      total: posts.length,
      open: 0,
      inProgress: 0,
      resolved: 0
    };

    // Map the aggregated counts to the stats
    ticketStats.forEach((stat) => {
      if (stat.status === "Open") stats.open = stat.count;
      if (stat.status === "Resolved") stats.resolved = stat.count;
      if (stat.status === "Closed") stats.inProgress = stat.count;
    });

    res.status(200).json({
      message: "Ticket posts fetched successfully",
      data: posts,
      stats, // Include the stats in the response
    });
  } catch (err) {
    next(err);
  }
};

 
// get single Ticket post
export const getSingleTicketPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const post = await Ticket.findOne({ _id: req.params.id });

    if (!post) {
      res.status(400).json({
        message: "Ticket post Not found",
      });
    }

    res.status(200).json({
      message: "Ticket post get successfully",
      data: post,
    });
  } catch (err) {
    next(err);
  }
};

// get all Ticket post search by area
export const getAllTicketPostSearchByArea = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const area = String(req.params.area); // Get type from request parameter
    //console.log(area);

    if (!area) {
      return res.status(400).json({ message: "Missing search Ticket post" });
    }

    const posts = await Ticket.find({ sellerCountry: area }); // Find by type

    res.status(200).json({
      message: "Ticket post get successfully",
      data: posts,
    });
  } catch (err) {
    next(err);
  }
};


// get all Ticket post search by group
export const getAllTicketPostSearchByModel = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const group = String(req.params.group); // Get type from request parameter
    console.log(group);

    if (!group) {
      return res.status(400).json({ message: "Missing search Ticket post" });
    }
    const posts = await Ticket.find({ brandModel: group }); // Find by type

    res.status(200).json({
      message: "Ticket posts get successfully",
      data: posts,
    });
  } catch (err) {
    next(err);
  }
};

// create new Ticket post
export const createTicketPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;

    console.log(data);

    if (Object.keys(data).length === 0) {
      res.status(400).json({
        message: "Data can't be empty",
      });
    }

    data.customerId=data.customerId
    const post = await Ticket.create(data);

    res.status(201).json({
      message: "Ticket post created Successfully",
      data: post,
    });
  } catch (err) {
    next(err);
  }
};

// update a Ticket post
export const updateTicketPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const postId = req.params.id;
    const post = await Ticket.findById(postId);

    if (!post) {
      res.status(400).json({
        message: "post not found",
      });
    }

    const updatedUser = await Ticket.findByIdAndUpdate(postId, req.body);

    res.status(200).json({
      message: "Ticket post updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

// delete Ticket post
export const deleteTicketPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const post = await Ticket.findByIdAndDelete(req.params.id);

    if (!post) {
      res.status(400).json({
        message: "Ticket post not found",
      });
    }

    res.status(200).json({
      message: "Ticket post Deleted Successfully",
    });
  } catch (err) {
    next(err);
  }
};

