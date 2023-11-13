import React from "react";

export default function Toggle({ enabled, setEnabled }) {

    return (
            <div className="flex bg-mainColor cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={enabled}
                        readOnly
                    />
                    <div
                        onClick={() => {
                            setEnabled(!enabled);
                        }}
                        className="w-11 h-6 bg-secondaryColor rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-btnColor"
                    ></div>
                    <span className="ml-2 text-sm font-medium text-gray-900">
                        
                    </span>
            </div>
    );
}