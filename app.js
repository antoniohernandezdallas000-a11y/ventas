document.addEventListener('DOMContentLoaded', () => {
    // State
    let cartQty = 0;
    const unitPrice = 14.99;

    // DOM Elements
    const qtyInput = document.getElementById('Quantity');
    const qtyInc = document.getElementById('qty-inc');
    const qtyDec = document.getElementById('qty-dec');
    
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const buyNowBtn = document.getElementById('buy-now-btn');
    const shopPayBtn = document.querySelector('.btn-shoppay');
    
    const cartDrawer = document.getElementById('cart-drawer');
    const cartTrigger = document.getElementById('cart-trigger');
    const closeCartTrigger = document.getElementById('close-cart-trigger');
    
    const headerCartCount = document.getElementById('header-cart-count');
    const cartDrawerBody = document.getElementById('cart-drawer-body');
    const emptyCartMsg = document.querySelector('.empty-cart-message');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartDrawerFooter = document.getElementById('cart-drawer-footer');
    const cartTotalVal = document.getElementById('cart-total-price');
    const removeCartItem = document.getElementById('remove-cart-item');
    const cartItemQtyLabel = document.getElementById('cart-item-qty-label');
    
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckoutModalBtn = document.getElementById('close-checkout-modal-btn');
    const cartCheckoutBtn = document.getElementById('cart-checkout-btn');
    const shopifyCheckoutForm = document.getElementById('shopify-checkout-form');
    
    const checkoutSummaryQty = document.getElementById('checkout-summary-qty');
    const summarySubtotal = document.getElementById('summary-subtotal');
    const summaryTotal = document.getElementById('summary-total');
    
    const successModal = document.getElementById('success-modal');
    const successDoneBtn = document.getElementById('success-done-btn');

    // 1. Quantity Selector Lnk
    qtyInc.addEventListener('click', () => {
        qtyInput.value = parseInt(qtyInput.value) + 1;
    });

    qtyDec.addEventListener('click', () => {
        const val = parseInt(qtyInput.value);
        if (val > 1) {
            qtyInput.value = val - 1;
        }
    });

    // 2. Cart Drawer Toggle
    function openCart() {
        cartDrawer.classList.add('open');
    }

    function closeCart() {
        cartDrawer.classList.remove('open');
    }

    cartTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        openCart();
    });

    closeCartTrigger.addEventListener('click', closeCart);

    // Close on overlay click
    cartDrawer.addEventListener('click', (e) => {
        if (e.target === cartDrawer) {
            closeCart();
        }
    });

    // Update Cart HTML
    function updateCartUI() {
        headerCartCount.textContent = cartQty;
        
        if (cartQty === 0) {
            emptyCartMsg.classList.remove('hide');
            cartItemsList.classList.add('hide');
            cartDrawerFooter.classList.add('hide');
        } else {
            emptyCartMsg.classList.add('hide');
            cartItemsList.classList.remove('hide');
            cartDrawerFooter.classList.remove('hide');
            
            cartItemQtyLabel.textContent = `Cant: ${cartQty}`;
            cartTotalVal.textContent = `$${(cartQty * unitPrice).toFixed(2)} USD`;
        }
    }

    // Add to Cart Action
    addToCartBtn.addEventListener('click', () => {
        const qty = parseInt(qtyInput.value);
        cartQty += qty;
        updateCartUI();
        openCart();
    });

    // Remove from Cart
    removeCartItem.addEventListener('click', () => {
        cartQty = 0;
        updateCartUI();
    });

    // 3. Checkout Modal Lnk
    function openCheckout(qty) {
        checkoutSummaryQty.textContent = qty;
        const total = (qty * unitPrice).toFixed(2);
        summarySubtotal.textContent = `$${total}`;
        summaryTotal.textContent = `$${total} USD`;
        
        checkoutModal.classList.add('open');
    }

    function closeCheckout() {
        checkoutModal.classList.remove('open');
    }

    buyNowBtn.addEventListener('click', () => {
        const qty = parseInt(qtyInput.value);
        openCheckout(qty);
    });

    shopPayBtn.addEventListener('click', () => {
        const qty = parseInt(qtyInput.value);
        openCheckout(qty);
    });

    cartCheckoutBtn.addEventListener('click', () => {
        closeCart();
        openCheckout(cartQty);
    });

    closeCheckoutModalBtn.addEventListener('click', closeCheckout);

    // Card Input Auto-Space
    const cardInput = document.getElementById('c-number');
    cardInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formatted = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formatted += ' ';
            }
            formatted += value[i];
        }
        e.target.value = formatted;
    });

    // Expiry Slash Format
    const expiryInput = document.getElementById('c-expiry');
    expiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\//g, '').replace(/[^0-9]/gi, '');
        if (value.length > 2) {
            e.target.value = value.substring(0, 2) + '/' + value.substring(2, 4);
        } else {
            e.target.value = value;
        }
    });

    // CVC length block
    const cvcInput = document.getElementById('c-cvc');
    cvcInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/gi, '').substring(0, 4);
    });

    // Checkout Submit
    shopifyCheckoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const payBtn = document.getElementById('pay-btn');
        payBtn.disabled = true;
        payBtn.textContent = 'Procesando...';

        setTimeout(() => {
            payBtn.disabled = false;
            payBtn.textContent = 'Pagar ahora';
            
            // Switch modals
            closeCheckout();
            successModal.classList.add('open');
            
            // Reset state
            cartQty = 0;
            updateCartUI();
            shopifyCheckoutForm.reset();
        }, 2000);
    });

    // Close success
    successDoneBtn.addEventListener('click', () => {
        successModal.classList.remove('open');
    });

    // Bind footer offer links to scroll to top (Shopify product pages usually redirect)
    document.querySelectorAll('.view-offer-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
});
