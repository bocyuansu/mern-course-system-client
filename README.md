# mern-course-system-client

這是一個使用 MongoDB、Express、React、Node.js 製作而成的課程系統專案，又稱 MERN 專案。

此專案實作功能如下

一、簡易會員系統

(1) 會員註冊時可以選擇學生或講師的身份，登入後分別呈現不同的介面及功能。

(2) 講師可以發佈課程、修改課程、刪除課程

(3) 學生可以搜尋課程、報名課程。

二、驗證機制

(1) 註冊會員時，使用 bcrypt 將密碼進行雜湊處理

(2) 後端使用 passport 實作 jwt 驗證使用者

(3) 提交表單時，有驗證機制，必須符合格式才能提交，否則會報錯，並根據錯誤情況自訂錯誤訊息

# Demo

https://bocyuansu.github.io/mern-course-system-client/course
