import  io  from "socket.io-client";
import { BASE_URL } from "../utils/constant";

// Function to create a socket connection
// It connects to the server using the BASE_URL defined in constants for local development
export const createSocketConnection = () => {
    return io(BASE_URL);
}