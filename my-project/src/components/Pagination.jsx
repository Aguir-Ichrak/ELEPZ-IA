import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

export default function Pagination({ currentPage, totalPages, onPageChange }) {

  const next = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1); 
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1); 
    }
  };

  const getItemProps = (index) => ({
    variant: currentPage === index ? "filled" : "text", 
    color: "white",
    onClick: () => onPageChange(index), 
  });

  return (
    <div className="flex items-center gap-4 rounded-lg mx-auto mb-4">
      <Button
        variant="text"
        className="flex items-center gap-2 text-white"
        onClick={prev}
        disabled={currentPage === 1} 
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>

      <div className="flex items-center gap-2">
        {[...Array(totalPages)].map((_, index) => (
          <IconButton
            key={index}
            {...getItemProps(index + 1)} 
            className="focus:bg-indigo-900"
          >
            {index + 1}
          </IconButton>
        ))}
      </div>

      <Button
        variant="text"
        className="flex items-center gap-2 text-white"
        onClick={next}
        disabled={currentPage === totalPages} 
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired, 
};
