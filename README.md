# CRUD - Next Js, Prisma, Postgress, Tailwindcss

## Start project with this command

```npm
npx create-next-app@latest
```

## Update layout.js, global.css, page.jsx for home page

## Now run project

```npm
npm run dev
```

## Now add this code as starting template in layout.js

```jsx
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CRUD - Next Js, Prisma, Postgress",
  description: "CRUD - Next Js, Prisma, Postgress",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` ${inter.className} antialiased`}>
        {/* Script section */}
        <head></head>

        {/* Navbar section */}
        <header className="">Header</header>

        {/* Main Section */}
        <main className="min-h-screen">{children}</main>

        {/* Footer Section */}
        <footer className="mx-auto py-4 text-center text-gray-600 bg-blue-200">
          <p>Made in love by coder jk</p>
          <p>All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}
```

## Now add components from shadcn button

```npm
npx shadcn@latest add button label input select table card sonner sheet dialog drawer
```

## Add css to global css

```css
@layer utilities {
  .gradient-main {
    @apply bg-gradient-to-br from-blue-600 to-purple-600;
  }

  .gradient-title {
    @apply gradient-main font-extrabold tracking-tighter pr-2 pb-2 text-transparent bg-clip-text;
  }
  .gradient-sub {
    @apply bg-gradient-to-br from-red-600 to-purple-600;
  }

  .gradient-subTitle {
    @apply gradient-sub font-extrabold tracking-tighter pr-2 pb-2 text-transparent bg-clip-text;
  }
}
```

## Now create header component

```jsx
import React from "react";

const Header = () => {
  return (
    <div className="fixed top-0 flex items-center justify-between px-8 py-4 bg-white/80 border-b backdrop-blur-md w-full">
      <div className="logo-section">
        <a href="/">Logo</a>
      </div>
      <div className="Menu-section">
        <ul className="flex gap-3">
          <li>
            <a href="/" className="hover:underline hover:text-blue-500">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:underline hover:text-blue-500">
              About
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
```

## Add layout for main

```jsx
import React from "react";

const MainLayout = ({ children }) => {
  return <div className="container mx-auto my-20">{children}</div>;
};

export default MainLayout;
```

## Now setup the project structure

1. Create actions folder for backend.
1. Create lib folder for utility files such as db connection.
1. Add Prisma and create model for database.
1. Migrate database.

## Now create lib folder inside app to define zod schema

### Add zod, useForm, zod resolver

```npm
npm install react-hook-form @hookform/resolvers zod
```

Name file as Schema.js

```js
import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(10, "Name should not be more than 10 char"),
  email: z.string().email("Please enter correct email"),
});
```

## Add Prisma to project

```npm
npx prisma init
```

## Now add databse url in .env file

```
DATABASE_URL="postgresql://kundalik0807:0807@localhost:5432/CRUD?schema=public"
```

## Now define model

```prisma
model User {
  id    Int    @default(autoincrement())
  name  String
  email String @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}

```

## Now migrate prisma models

```npm
npx prisma migrate dev --name init
```

# Now to clone this project

## Clone this or download file

## Delete migration folder

## Run npm i

```npm
npm i --legacy-peer-deps
```

## Now run prisma migrate command
