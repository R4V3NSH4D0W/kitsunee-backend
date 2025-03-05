import { NEWS } from "@consumet/extensions";

const News= new NEWS.ANN();

export const IsNewsWorking = async()=>{
    return await News.isWorking;
}

export const newsFeed =async()=>{
    return await News.fetchNewsFeeds();
}

export const newsInfo= async(id:string)=>{
    return await News.fetchNewsInfo(id);
}