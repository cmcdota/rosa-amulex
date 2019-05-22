console.log( window.location.hostname );
const host = window.location.hostname;
export const environment = {
  staging: false,
  production: true,
  products: `https://${host}:81/api/certificates`,
  created: `https://${host}:81/api/createdList`,
  postCerts: `https://${host}:81/api/certificates`,
  sendMail: `https://${host}:81/api/certificateSend`,
  getFiles: `https://${host}:81/api/certificateFiles`,
  storage: `https://${host}:81`,
  getAuth: `https://${host}:81/api/auth`,
}
