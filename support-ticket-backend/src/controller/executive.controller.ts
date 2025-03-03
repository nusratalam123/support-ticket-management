import { NextFunction, Request, Response } from "express";

import Executive from "../model/executive.model";

// get all executive post Executives
export const getAllExecutiveUser = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const Executives = await Executive.find({}).sort({ name: -1 });

    res.status(200).json({
      message: "Executives get successfully",
      data: Executives,
    });
  } catch (err) {
    next(err);
  }
};

// get single Executive post Executive
export const getSingleExecutiveUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const executive = await Executive.findOne({ _id: req.params.id });

    if (!Executive) {
      res.status(400).json({
        message: "Executive Not found",
      });
    }

    res.status(200).json({
      message: "Executive get successfully",
      data: Executive,
    });
  } catch (err) {
    next(err);
  }
};

// get single Executive  Executive 
export const getSingleExecutiveExecutive = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const executive = await Executive.findOne({ _id: req.params.id }).select("status");

    if (!Executive) {
      res.status(200).json({
        message: "Executive not found",
      });
    }

    res.status(200).json({
      message: "Executive status get successfully",
      data: Executive,
    });
  } catch (err) {
    next(err);
  }
};

// create new Executive post
export const createExecutivePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;

    if (Object.keys(data).length === 0) {
      res.status(400).json({
        message: "Data can't be empty",
      });
    }

    const executive = await Executive.create(data);

    res.status(201).json({
      message: "Executive post created Successfully",
      data: Executive,
    });
  } catch (err) {
    next(err);
  }
};


// delete Executive
export const deleteExecutivePost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const executive = await Executive.findByIdAndDelete(req.params.id);

    if (!Executive) {
      res.status(400).json({
        message: "Post not found",
      });
    }

    res.status(200).json({
      message: "Executive post Deleted Successfully",
    });
  } catch (err) {
    next(err);
  }
};

