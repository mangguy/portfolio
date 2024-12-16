import type { NextConfig } from "next";
import dotenv from 'dotenv'


dotenv.config();

const nextConfig: NextConfig = {
  env: {
    MONGODB_URL: process.env.MONGODB_URL,
  },
  
  
};

export default nextConfig;
