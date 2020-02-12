import restAPI from "./restApi";

class APIService {
    getLanguages = async () => {
        return new Promise(async(res, rej) => {
            try{
                const languageData = await restAPI.get("languages")
                res(languageData);
            } catch(err) {
                rej(err)
            }
        });
    }

    getChannel = async () => {
        return new Promise(async(res, rej) => {
            try{
                const channelData = await restAPI.get("channels")
                res(channelData);
            } catch(err) {
                rej(err)
            }
        });
    }

    getTopicCodes = async () => {
        return new Promise(async(res, rej) => {
            try{
                const topicCodeData = await restAPI.get("topic-codes")
                res(topicCodeData);
            } catch(err) {
                rej(err)
            }
        });
    }

    getDestinations = async () => {
        return new Promise(async(res, rej) => {
            try{
                const data = await restAPI.get("destinations")
                res(data);
            } catch(err) {
                rej(err)
            }
        });
    }

    fetchSearchResult = async (payload) => {
        return new Promise(async(res, rej) => {
            try{
                const data = await restAPI.post("/documents",payload)
                res(data);
            } catch(err) {
                rej(err)
            }
        });
    }

    fetchSingleRecord = async (id) => {
        return new Promise(async(res, rej) => {
            try{
            const data = await restAPI.get("/documents/"+encodeURIComponent(id.payload))
            res(data);
            }catch(err){
                rej(rej);
            }
        });
    }

    downloadSample = async (payload) => {
        return new Promise(async(res, rej) => {
            try{
                const data = await restAPI.post("/export/sample",payload)
                res(data);
            } catch(err) {
                rej(err)
            }
        });
    }

    exportData = async (payload) => {
        console.log('in api', payload);
        // return new Promise(async(res, rej) => {
        //     try{
        //         const data = await restAPI.post("/export/log-query",payload)
        //         res(data);
        //     } catch(err) {
        //         rej(err)
        //     }
        // });
    }
}

export default new APIService(); 