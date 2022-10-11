import { ContactSupport, CreditCard, EmojiSymbols, LocalShipping, Money } from '@material-ui/icons';
import './footer.scss';

export default function Footer() {
  return (
    <div className='footer'>
        <div className="container">
            <div className="services">
                <div className="item borderRight">
                    <LocalShipping />
                    <div className="content">
                        <h3>Free Delivery</h3>
                        <span>Free Shipping on all Winning Bid</span>
                    </div>
                </div>
                <div className="item borderRight">
                    <ContactSupport />
                    <h3>Free Delivery</h3>
                    <span>Free Shipping on all Winning Bid</span>
                </div>
                <div className="item borderRight">
                    <Money />
                    <h3>Free Delivery</h3>
                    <span>Free Shipping on all Winning Bid</span>
                </div>
                <div className="item borderRight">
                    <EmojiSymbols />
                    <h3>Free Delivery</h3>
                    <span>Free Shipping on all Winning Bid</span>
                </div>
                <div className="item">
                    <CreditCard />
                    <h3>Free Delivery</h3>
                    <span>Free Shipping on all Winning Bid</span>
                </div>
            </div>
            <div className="copyright"></div>
        </div>
    </div>
  )
}
