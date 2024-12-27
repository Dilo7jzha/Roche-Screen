// api.js
import axios from 'axios';

//let APIURL = location.origin+process.env.VUE_APP_BASE_API+"/screenApi/getScreen";
let APIURL = "http://172.28.176.168:9303/screenApi/getScreen";


export const fetchScreenData = () => {
    return axios.get(APIURL)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw new Error(error.message);
        });
};

export const fetchImages = async () => {
    try {
        const response = await axios.get(APIURL);
        
        const rightBottom = response.data.data || [];
        // const imageUrls = rightBottom.map(item => item.screenContent || []).flat();
        return rightBottom;
    } catch (error) {
        console.error('Error fetching images:', error);
        return [];
    }
};