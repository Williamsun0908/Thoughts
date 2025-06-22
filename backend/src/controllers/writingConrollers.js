import writingModel from "../models/writing.js";

// Fetch all writings

export async function getAllWritings(_,res) {
    try{
        // Newest to Oldest using .sort({createdAt:-1})
        const writings = await writingModel.find().sort({createdAt:-1})
        res.status(200).json(writings)
    } catch(error) {
        console.error("Error in getAllWritings controller", error)
        res.status(500).json({message: "Internal Server Error"})
    }
}

// Fetch all writings by user with googleId
export async function getWritingsByGoogleId(req,res){
    try{
        const { googleId } = req.params
        const writings = await writingModel.find({ googleId }).sort({ createdAt: -1 })
        res.json(writings)
    } catch(error) {
        console.error("Error in getWritingsByGoogleId Controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Fetch specific writing by _id
export async function getWritingById(req,res){
    try{
        const writing = await writingModel.findById(req.params.id)
        if(!writing) {
            return res.status(404).json({message:"writing not found"})
        }
        res.json(writing)
    } catch(error) {
        console.error("Error in getWritingById controller", error)
        res.status(500).json({message: "Internal Server Error"})
    }   
}

// Create a writing
export async function createWriting(req,res){
    try{
        const {title, summary, content, googleId, name, avatar, email} = req.body
        const newWriting = new writingModel({title, summary, content, googleId, name, avatar, email})
        await newWriting.save()
        res.status(201).json({message:"Writing created!"})
    } catch(error) {
        console.error("Error in createWriting controller", error)
        res.status(500).json({message: "Internal Server Error"})
    }
}

// Update writing by _id

export async function updateWriting(req,res){
    try{
        const {title, summary, content} = req.body
        const updatedWriting = await writingModel.findByIdAndUpdate(
            req.params.id,
            {title, summary, content},
            { new: true}
        )
        if(!updatedWriting){
            return res.status(404).json({message: "writing not found"})
        }
        res.json(writing)
    } catch(error) {
        console.error("Error in updateWriting contr                                                                                 oller", error)
        res.status(500).json({message: "Internal Server Error"})
    }
}

//delete writing by _id
export async function deleteWriting(req,res){
    try{
        console.log(req.params.id)
        const writingToDelete = await writingModel.findByIdAndDelete(req.params.id)
        if(!writingToDelete){
            return res.status(404).json({message: "writing not found"})
        }
        res.status(200).json({writingToDelete})
    } catch(error) {
        console.error("Error in deleteWriting controller", error)
        res.status(500).json({message: "Internal Server Error"})
    }
}

// controllers/writingController.js
export async function searchWritings(req, res) {
    console.log(req.query)
  const { query } = req.query;                       // e.g. ?q=Artin
  if (!query) {
    return res.status(400).json({ message: "missing search query" });
  }
  try {
    const writings = await writingModel.find({$text: { $search: query }}).sort({createdAt:-1});
    res.json(writings);
  } catch (error) {
    console.error("Error in searchWritings controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}