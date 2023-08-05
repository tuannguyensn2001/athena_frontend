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
      className = {'tw-shadow-md tw-max-w-sm hover:tw-cursor-pointer hover:tw-bg-gray-100 tw-overflow-hidden object-contain tw-inline-block'}  
      style = {{ border: '1px solid #D8DCF0'}}
      cover = {
        <img
          className={'tw-w-4/5 md:tw-w-72 object-cover hover:tw-scale-105 tw-transition tw-duration-500'}
          alt = {title}
          src = {imgSrc} 
        />
      }
    >
      <div className="tw-flex tw-flex-row tw-flex-wrap tw-relative">
        <div className="tw-text-left">
          <Meta 
            title= {title}
          />
          <p className="tw-text-left tw-uppercase"> {id} </p>
        </div>

        <button 
        className ="tw-absolute tw-right-2 tw-text-2xl tw-w-12 tw-h-12 tw-bg-inherit hover:tw-rounded-full hover:tw-bg-slate-50 tw-border-none hover:tw-cursor-pointer"
        >
          <EllipsisOutlined />
        </button>
      </div>
    </Card>
)
