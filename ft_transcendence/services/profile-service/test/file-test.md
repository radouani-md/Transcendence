

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlclR5cGUiOiJVU0VSIiwiaWF0IjoxNzk1MTE2MjI5LCJleHAiOjE3OTUyMDI2Mjl9.SkDB1d6WbcS7fEp6THW5jHPyNaq9lNY2UvXlkzleCgA



+ Test Login

curl -i -X POST http://localhost:3006/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "YOUR_EMAIL",
    "password": "YOUR_PASSWORD"
  }'


+ Get profile me

curl -i -X GET http://localhost:3007/api/profile/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"



+ Test Password

curl -i -X PATCH http://localhost:3007/api/profile/me/password \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "currentPassword": "OldPassword123!",
    "newPassword": "NewPassword456!",
    "confirmPassword": "NewPassword456!"
  }'

+ Bio
+ Test normal bio

curl -i -X PATCH http://localhost:3007/api/profile/me/bio \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "bio": "I am a software developer and football fan."
  }'

