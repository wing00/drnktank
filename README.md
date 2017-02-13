# DrnkTank

Drinktank was taken

## Features

running react.js, django, webpack, python3 on heroku

## How to Use

#### Mac
    # get brew
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
    brew install node python3 git
    
    pip install virtualenv 
    
    mkdir drnktank 
    cd drnktank
    virtualenv venv -p python3
    source venv/bin/activate 
    
    git init
    git remote add origin https://github.com/wing00/drnktank.git
    git pull origin master
          
### Setup (first time)
    
    pip install -r requirements.txt
    npm install
    python manage.py migrate
    
### To build the static files run server (every time)
    
    npm run build
    python manage.py collectstatic --noinput
    python manage.py runserver
   

## Deployment to Heroku


Synced with git

        
    ... (change files)
    git add .
    git commit -m "meaningful text here"
    git push origin master
        

Making your own branch
   
   
    git branch newbranchname
    ...
    git checkout newbranchme
    git add .
    git commit -m "meaningful messages"
    git push origin newbranchname 
    