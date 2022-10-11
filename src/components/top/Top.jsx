import './top.scss';
import { AccountCircle, Search, ShoppingCart } from "@material-ui/icons"
import { Badge } from '@material-ui/core';
export const Top = () => {
  return (
    <div className='top'>
        <div className="container">
            <div className="wrapper">
                <div className="logo">OnlineBidder</div>
                <div className="search">
                    <div className="searchWrapper">
                        <div className="dropDown">
                            <select>
                                <option disabled defaultChecked>All Category</option>
                                <option>Electronics</option>
                                <option>Scceramics</option>
                                <option>Watch</option>
                                <option>Others</option>
                            </select>
                        </div>
                        <div className="input"><input className='searchInput' type="text" placeholder='Search Products Here.....' /></div>
                        <div className="searchIcon"><Search/></div>
                    </div>
                </div>
                <div className="icon">
                    <div className="iconItem">
                        <AccountCircle />
                    </div>
                    <div className="iconItem">
                        <Badge overlap='rectangular' badgeContent={4} color="primary">
                            <ShoppingCart/>
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
