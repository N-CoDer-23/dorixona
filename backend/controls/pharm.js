const Pharm = require('../model/pharmacySchema');

let time = new Date();
let addDay = time.getDay() + "." + (time.getMonth() + 1) + "." + time.getFullYear();


// ------Searching----------
const searchPharm = async (req, res) => {
    const {query} = req.query;

    try{
        const pharms = await Pharm.find({
            $or: [{
                    name:
                        {$regex: query, $options: 'i'}},
                 {
                    model:
                        {$regex: query, $options: 'i'}
            }]
        });
        res.json({
            seccess: true,
            message: "Searching successfull!",
            innerData: pharms
        })
    } catch(error){
        res.json({ seccess: true, message: error })
    }
}


// ---------Get Pharm----------
const getPharm = async (req, res) => {
    try{
        let allpharms = await Pharm.find();
        if (!allpharms) {
            return  res.json({
                seccess: false,
                message: "Pharm is not found!",
                innerData: allpharms
            })
        }
        res.json({
            seccess: true,
            message: "Pharm is found!",
            innerData: allpharms
        })
    }catch(error){
        res.json({ seccess: true, message: error })
    }
}


// ------create pharm------------
const createPharm = async(req, res)=>{
    try {
        // const { addDay } = req.body;
        // addDay:addDay
        const addData = req.body;
        const createData = new Pharm (addData);
        await createData.save();

    }catch(error){
        res.json({ seccess: true, message: error })
    }
}

//------delete car-----
const deletePharm = async (req, res)=>{
    try {
        let { id } = req.body;
        let deleted = await Pharm.findByIdAndDelete({_id: id });
        if (!deleted){
            return  res.json({
                seccess: false,
                message: "Pharm is not found!",
                innerData: deleted
            })
        }
        res.json({
            seccess: true,
            message: "Pharm is found!",
            innerData: deleted
        })

    }catch(error){
        res.json({ seccess: true, message: error })
    }
}

//------update car-----
const updatePharm = async (req, res)=>{
    try{
        let { id } = req.body;
        let body = req.body;
        let updated = await Pharm.updateMany({ _id: id }, body);
        if (!updated) {
            return res.json({
                seccess: false,
                message: "Pharm is not updated!",
                innerData: updated
            })
        }
        res.json({
            seccess: true,
            message: "Pharm is updated!",
            innerData: updated
        })

    }catch(error){
        res.json({ seccess: true, message: error })
    }
}

module.exports = {
    updatePharm,
    getPharm,
    createPharm,
    deletePharm,
    searchPharm

}