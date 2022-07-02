import axios from 'axios';
// axios.defaults.withCredentials=true;
export function request(config) {
 const instance = axios.create({
  // baseURL: 'http://www.打字人.ltd:7071/',
  baseURL: 'http://localhost:1000/',
//   timeout: 10000,
 });
  instance.interceptors.request.use(config => {
  return config;
},err=>{
 console.log(err);
})
instance.interceptors.response.use(res => {
 return res;
},err => { 
 console.log(err);
})
return instance(config);
}