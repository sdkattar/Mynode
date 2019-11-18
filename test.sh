#!/bin/bash
npm install

if [$( docker container ls -q --filter name=myserver1_c) != '' ]; then
 docker container stop myserver1_c
 docker container rm myserver1_c --force
fi

if [$( docker image ls -q --filter reference=mydb)!='']; then
 docker image rm myserver1_c
fi

 docker image build -t myserver_img .

 docker container run -itd -p 4400:4000 --name myserver1_c myserver_img
