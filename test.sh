#!/bin/bash
npm install

if [$(sudo docker container ls -q --filter name=myserver1_c) != '' ]; then
sudo docker container stop myserver1_c
sudo docker container rm myserver1_c --force
fi

if [$(sudo docker image ls -q --filter reference=mydb)!='']; then
sudo docker image rm myserver1_c
fi

sudo docker image build -t myserver_img .

sudo docker container run -itd -p 4400:4000 --name myserver1_c myserver_img
