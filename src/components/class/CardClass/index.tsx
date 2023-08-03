import React from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import { Card } from "antd";

export function CardClass() {
  const { Meta } = Card;
  

  return (
    <div className = {'tw-container tw-gap-4 tw-flex md:tw-flex-row sm:tw-flex-col tw-flex-wrap tw-content-center'}>

      <Card
        className = {'tw-md tw-shadow-md hover:tw-cursor-pointer hover:tw-bg-gray-100 tw-overflow-hidden'}
        style={{ width: 360, border: '1px solid #D8DCF0'}}
        cover={
            <img
              className={'hover:tw-scale-105 tw-transition tw-duration-500 tw-object-cover'}
              alt="Courseclass"
              src="https://shub-storage.sgp1.cdn.digitaloceanspaces.com/profile_images/22-01.jpg"
            />
        }
      >
        <div className="tw-flex">
          <Meta 
            className = 'tw-text-left tw-w-full'
            title="Course 1"
            description="WSDEF"
          />
          <EllipsisOutlined className ="tw-text-2xl"/>
        </div>
      </Card> 

      <Card
        className = {'tw-md tw-shadow-md hover:tw-cursor-pointer hover:tw-bg-gray-100 tw-overflow-hidden'}
        style={{ width: 360, border: '1px solid #D8DCF0'}}
        cover={
            <img
              className={'hover:tw-scale-105 tw-transition tw-duration-500 tw-object-cover'}
              alt="Courseclass"
              src="https://shub-storage.sgp1.cdn.digitaloceanspaces.com/profile_images/22-01.jpg"
            />
        }
      >
        <div className="tw-flex">
          <Meta 
            className = 'tw-text-left tw-w-full'
            title="Course 1"
            description="WSDEF"
          />
          <EllipsisOutlined className ="tw-text-2xl"/>
        </div>
      </Card> 

    </div>
  );
  
}




