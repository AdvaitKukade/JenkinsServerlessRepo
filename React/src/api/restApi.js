import axios from "axios";

class ApiService {

  constructor() {
    this.axios = axios.create({
      baseURL: 'http://7a450230.ngrok.io/api'
    })
  }

  get = url => {
    return new Promise( async(resolve, reject) => {
      try {
        const response = await this.axios.get(url);
        resolve(response.data)
      } catch(err) {
        console.log("APIService : get error", err);
        reject(err);
      }
      
    });
  }

  post = (url,payload) => {
    return new Promise( async(resolve, reject) => {
      try {
        const response = await this.axios.post(url, payload);
        resolve(response.data)
      } catch(err) {
        console.log("APIService : post error", err);
        reject(err);
      }
      
    });
  }

}

export default new ApiService();
