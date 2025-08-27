import  io  from "socket.io-client";
import { API_ENDPOINTS } from "../utils/constants";

// Function to create a socket connection
// It connects to the server using the BASE_URL defined in constants for local development
export const createSocketConnection = () => {
    return io(API_ENDPOINTS.BASE_URL);
}