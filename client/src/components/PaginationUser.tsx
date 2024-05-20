//PAGINATIONUSER.TSX
import React from "react";
import { Button } from "antd";

//Interface______________
interface PaginationUserProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const PaginationUser: React.FC<PaginationUserProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className='pagination'>
      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          style={{
            margin: 2,
            background: index + 1 === currentPage ? "#1890ff" : "white",
            color: index + 1 === currentPage ? "white" : "#1890ff",
          }}>
          {index + 1}
        </Button>
      ))}
    </div>
  );
};
