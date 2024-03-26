# Use the official nginx image
# Use the official Nginx image
FROM nginx:alpine

# Remove the default Nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Create a new Nginx configuration file to set the entry point as login.html
RUN echo "server { \
    listen 80; \
    server_name localhost; \
    location / { \
        root /usr/share/nginx/html; \
        index login.html; \
    } \
}" > /etc/nginx/conf.d/default.conf

# Copy the contents of the local 'app' directory to the default Nginx web root
COPY ./login.html /usr/share/nginx/html/index
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80