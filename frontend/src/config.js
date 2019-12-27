import { transitions, positions } from 'react-alert';

export default {
    SERVER_IP: "localhost",
    SERVER_PORT: "8000",
    SERVER_WS_PORT: "8001",
    API_URL: "http://localhost:8000/api",
    alert: {
        position: positions.TOP_RIGHT,
        timeout: 5000,
        offset: '30px',
        transition: transitions.FADE
    }
};