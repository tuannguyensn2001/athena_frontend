import React from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import { Card } from "antd";

const { Meta } = Card;

type CardCourseProps = {
    imgSrc: string,
    title: string,
    id: string,
}

export const CardClass: React.FC<CardCourseProps> = ({
    imgSrc,
    title,
    id
}) => 
 (
    <Card
      className = {'tw-md tw-shadow-md hover:tw-cursor-pointer hover:tw-bg-gray-100 tw-overflow-hidden'}  
      style = {{ width: 360, border: '1px solid #D8DCF0'}}
      cover = {
        <img
          className={'hover:tw-scale-105 tw-transition tw-duration-500 tw-object-cover'}
          alt = {title}
          src = {imgSrc} 
        />
      }
    >
      <div className="tw-flex">
           <Meta 
            className = 'tw-text-left tw-w-full'
            title= {title}
            description= {id}
          />
          <EllipsisOutlined className ="tw-text-2xl"/>
        </div>

    </Card>
)
