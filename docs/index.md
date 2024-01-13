# Welcome Agri-Inn

Agri-Inn revolutionizes livestock farming by seamlessly connecting users, streamlining operations, and fostering community collaboration for a sustainable and closely-knit farming future.


To learn more about Agri-Inn, visit [About Us](about.md).

---

## Quick Links
> To view each feature, visit [Features](features.md).
> 
> To view comprehensive documentation for each feature, visit [Documentation](./docs.md).
> 
> To view the API documentation, visit [API References](api.md).
> 
> To view the database documentation, visit [Database References](database.md).

--- 

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Operating system**: Windows 10 or newer, 64-bit macOS 10.13+, or Linux, including Ubuntu, RedHat, CentOS 7+, and others.
- **System architecture**: Windows- 64-bit x86, 32-bit x86; macOS- 64-bit x86 & Apple M1 (ARM64); Linux- 64-bit x86, 64-bit aarch64 (AWS Graviton2), 64-bit IBM Power8/Power9, s390x (Linux on IBM Z & LinuxONE).
- Minimum **150 MB** disk space to download and install.
- **[Node.js](https://nodejs.org/en/)** (v14.17.0 or higher)
- **[MongoDB](https://www.mongodb.com/)** (v4.4.6 or higher)

--- 

## Installation

**1. Clone the repository:**

```bash
git clone https://github.com/mariamuna04/Agri-Inn.git
```

**2. Install node packages**

```bash
npm install
```

**3. Create `.env` at the root of the project**
> For Security reasons, the `.env` file is not included in the repository. Please contact the developers for the `.env` file.

**3. Run the project**

```bash
npm run dev
```

---

## Project layout

Below is a full overview of the project layout.

    ├───.github                                   # Github related files
    ├───node_modules                              # Node packages
    ├───src                                       # Source files (alternatively `app`)
    │   ├───lib                                   # Libraries
    │   │   ├───assets                            # Assets (images, videos, icons, etc.)
    │   │   │   ├───icons                         
    │   │   │   ├───images                        
    │   │   │   ├───notificationIcon              
    │   │   │   └───videos                        
    │   │   ├───client                            # Client side TypeScript files
    │   │   ├───components                        # SvelteKit components
    │   │   │   ├───dynamicNavigations            
    │   │   │   │   ├───events
    │   │   │   │   ├───farm
    │   │   │   │   ├───forum
    │   │   │   │   └───news
    │   │   │   └───payment-section
    │   │   ├───server                            # Server side TypeScript files
    │   │   │   └───databaseObjects               # [See Database References]
    │   │   └───stores                            # SvelteKit stores
    │   └───routes                                # SvelteKit routes (pages)
    │       ├───about                             # About Us page
    │       ├───API                               # API routes
    │       │   └───v1
    │       │       ├─── ...                      # [See API References]
    │       ├───chat                              # Chat page
    │       ├───dashboard                         # Dashboard page
    │       ├───events                            # Events page
    │       │   └───[event_id]
    │       ├───farms                             # Farms page                               
    │       │   └───[farm]
    │       │       └───[product_id]
    │       ├───forum                             # Forum page
    │       │   └───[id]
    │       ├───health-track                      # Health Track page
    │       ├───installments                      # Installments page
    │       ├───marketplace                       # Marketplace page
    │       │   └───cart    
    │       ├───news                              # News page
    │       │   └───[id]
    │       ├───saved-item                        # Saved Item page
    │       ├───search                            # Search page
    │       ├───sign-in                           # Sign In page
    │       │   ├───forgot-password
    │       │   │   └───[password_reset_token]
    │       │   └───google  
    │       ├───sign-up                           # Sign Up page
    │       └───[username]                        # User profile page
    ├───static                                    # Static files (alternatively `public`)
    ├───.env                                      # Environment variables
    ├───.gitignore                                # Git ignore file
    ├───.npmrc                                    # NPM configuration file
    ├───CODE_OF_CONDUCT.md                        # Code of Conduct
    ├───LICENSE                                   # License
    ├───package-lock.json                         # Package lock file     
    ├───package.json                              # Package file
    ├───postcss.config.js                         # PostCSS configuration file             
    ├───README.md                                 # Readme file
    ├───SECURITY.md                               # Security file
    ├───svelte.config.js                          # Svelte configuration file
    ├───tailwind.config.js                        # Tailwind configuration file
    ├───tsconfig.json                             # TypeScript configuration file
    ├───vite.config.ts                            # Vite configuration file