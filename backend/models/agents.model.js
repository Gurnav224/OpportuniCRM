import mongoose, {Schema} from "mongoose";


const AgentSchema = new Schema({
    name:{
        type:String,
        required:[true, 'Sales Agent name  is required']
    },
    email:{
        type:String,
        required:[true, 'Sales Agent email is required']
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})


export const Agent = mongoose.model('Agent', AgentSchema);