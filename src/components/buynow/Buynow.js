import {Divider} from '@mui/material';
import React from 'react';
import "./buynow.css";

const Buynow = ()=> {
    return <div className='buynow_section'>
        <div className='buynow_container'>
            <div className="left_buy">
                <h1>Shopping cart</h1>
                <p>select all item</p>
                <span className='leftbuyprice'>Price</span>
                <Divider/>

                <div className="item_containert">
                    <img src="https://rukminim1.flixcart.com/image/416/416/kll7bm80/smartwatch/c/1/n/43-mo-sw-sense-500-android-ios-molife-original-imagyzyycnpujyjh.jpeg?q=70" alt="cart_img"/>
                    <div className="item_details">
                        <h3>Molife Sense 500 Smartwatch (Black Strap, Free)</h3>
                        <h3>Smart watchs</h3>
                        <h3 className='deffrentprice'>$4049</h3>
                        <p className='unusuall'>Usually dispatched in 8 day</p>
                        <p>Eligible for Free shippinng</p>
                        <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    </div>;
};

export default Buynow