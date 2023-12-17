import { jwtDecode } from "jwt-decode";


const parseJwt = (token) => {
    try {
        return jwtDecode(token);
    } catch (e) {
        return null;
    }
};

export default parseJwt;