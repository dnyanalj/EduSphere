# Use official Node image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# ✅ Copy Prisma schema BEFORE npm install
COPY prisma ./prisma

# Install dependencies
RUN npm install --production

# Copy rest of backend code
COPY . .

# Expose port (Railway will override this anyway)
EXPOSE 4000

# Run the app
CMD ["npm", "start"]
