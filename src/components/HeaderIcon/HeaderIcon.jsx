import React from 'react';

export default function HeaderIcon() {
  return (
    <>
      <div className="pt-4 flex items-center mb-6 justify-end">
        <img
          src="https://source.unsplash.com/person/200x200"
          alt="user"
          className="h-9 w-9 object-cover rounded-full"
        />
      </div>
    </>
  );
}
