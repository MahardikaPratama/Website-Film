import React, { useState } from 'react';

const PaginationHome = ({ currentPage, totalEntries, entriesPerPage, onPageChange }) => {
    const [page, setPage] = useState(currentPage);
    const totalPages = Math.ceil(totalEntries / entriesPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handlePrev = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
            onPageChange(page - 1);
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            setPage(prevPage => prevPage + 1);
            onPageChange(page + 1);
        }
    };

    const handleFirstPage = () => {
        setPage(1);
        onPageChange(1);
    };

    const handleLastPage = () => {
        setPage(totalPages);
        onPageChange(totalPages);
    };

    const handlePageClick = (pageNum) => {
        setPage(pageNum);
        onPageChange(pageNum);
    };

    return (
        <div className="flex flex-col items-center mt-4">
            {/* Displaying Data Range */}
            <span className="text-sm text-gray-700 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{(page - 1) * entriesPerPage + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{Math.min(page * entriesPerPage, totalEntries)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{totalEntries}</span> Entries
            </span>

            {/* Pagination Controls */}
            <div className="inline-flex mt-2">
                <button
                    onClick={handleFirstPage}
                    className="flex items-center justify-center h-8 px-3 text-sm font-medium text-white bg-gray-700 rounded-l hover:bg-gray-900 disabled:bg-gray-600"
                    disabled={page === 1}
                >
                    First
                </button>
                <button
                    onClick={handlePrev}
                    className="flex items-center justify-center h-8 px-3 text-sm font-medium text-white bg-gray-700 hover:bg-gray-900 disabled:bg-gray-600"
                    disabled={page === 1}
                >
                    Prev
                </button>

                {/* Page Numbers */}
                {pageNumbers.map((num) => (
                    <button
                        key={num}
                        onClick={() => handlePageClick(num)}
                        className={`h-8 px-3 text-sm font-medium ${num === page ? 'bg-gray-900 text-white' : 'bg-gray-700 text-white'} hover:bg-gray-900`}
                    >
                        {num}
                    </button>
                ))}

                <button
                    onClick={handleNext}
                    className="flex items-center justify-center h-8 px-3 text-sm font-medium text-white bg-gray-700 hover:bg-gray-900 disabled:bg-gray-600"
                    disabled={page === totalPages}
                >
                    Next
                </button>
                <button
                    onClick={handleLastPage}
                    className="flex items-center justify-center h-8 px-3 text-sm font-medium text-white bg-gray-700 rounded-r hover:bg-gray-900 disabled:bg-gray-600"
                    disabled={page === totalPages}
                >
                    Last
                </button>
            </div>
        </div>
    );
};

export default PaginationHome;
