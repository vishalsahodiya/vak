<?php

/**
 * @author     Kristof Ringleff
 * @author     Magento Core Team <core@magentocommerce.com>
 * @package    Fooman_EmailAttachments
 * @copyright  Copyright (c) 2009 Fooman Limited (http://www.fooman.co.nz)
 * @copyright  Copyright (c) 2008 Irubin Consulting Inc. DBA Varien (http://www.varien.com)
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

class Fooman_EmailAttachments_Model_Order_Pdf_Order extends Mage_Sales_Model_Order_Pdf_Invoice
{

    /**
     * create a order pdf modelled on the invoice content
     *
     * @param array $orders
     *
     * @return Zend_Pdf
     */
    public function getPdf ($orders = array())
    {
        $this->_beforeGetPdf();
        $this->_initRenderer('order');

        $pdf = new Zend_Pdf();
        $this->_setPdf($pdf);
        $style = new Zend_Pdf_Style();
        $this->_setFontBold($style, 10);
        $currentStoreId = Mage::app()->getStore()->getId();
        foreach ($orders as $order) {
            //could be order id
            if ( !$order instanceof Mage_Sales_Model_Order) {
                $order = Mage::getModel('sales/order')->load($order);
            }

            if ($order->getStoreId()) {
                Mage::getSingleton('customer/address_config')->setStore($order->getStoreId());
                Mage::app()->getLocale()->emulate($order->getStoreId());
                Mage::app()->setCurrentStore($order->getStoreId());
            }
            $page = $pdf->newPage(Zend_Pdf_Page::SIZE_A4);
            $pdf->pages[] = $page;

            /* Add image */
            $this->insertLogo($page, $order->getStore());

            /* Add address */
            $this->insertAddress($page, $order->getStore());

            /* Add head */
            $this->insertOrder(
                $page,
                $order,
                true
            );
	        $page->setLineColor(new Zend_Pdf_Color_GrayScale(0));
	        $page->drawLine(25, $this->y, 570, $this->y);
            $this->y -=5;

            $page->setFillColor(new Zend_Pdf_Color_GrayScale(1));
            $this->_setFontBold($page,10);


            /* Add table */
            $page->setFillColor(new Zend_Pdf_Color_GrayScale(1));
            $page->setLineColor(new Zend_Pdf_Color_GrayScale(1));
            $page->setLineWidth(0.5);

            $page->drawRectangle(25, $this->y, 570, $this->y - 15);
	        $this->y -=5;
            
            $page = $this->_printTableHead($page);

	        $page->setLineColor(new Zend_Pdf_Color_GrayScale(0));
	        $page->drawLine(25, $this->y, 570, $this->y);
	        $this->y -=10;

            $page->setFillColor(new Zend_Pdf_Color_GrayScale(0));

            $page = $this->_printItems($order, $page);

            /* Add totals */
            $order->setOrder($order);
            $page = $this->insertTotals($page, $order);
            $page = $this->_printComments($order, $page);

            if ($order->getStoreId()) {
                Mage::app()->getLocale()->revert();
            }
        }

        $this->_afterGetPdf();
        Mage::app()->setCurrentStore($currentStoreId);
        return $pdf;
    }

    protected function _printItems($order, $page)
    {
        /* Add body */
        foreach ($order->getAllItems() as $item) {
            if ($item->getParentItem()) {
                continue;
            }

            if ($this->y < 15) {
                $page = $this->newPage(array('table_header' => true));
            }

            /* Draw item */
            //temporarily set item as if we were printing an invoice
            $item->setQty($item->getQtyOrdered());
            $item->setOrderItem($item);
            $page = $this->_drawItem($item, $page, $order);

	        $page->setLineColor(new Zend_Pdf_Color_GrayScale(0));
	        $page->drawLine(25, $this->y, 570, $this->y);
	        $this->y -=10;

        }
        return $page;
    }

    protected function _printComments($order, Zend_Pdf_Page $page)
    {
        if (Mage::helper('core')->isModuleEnabled('Magemaven_OrderComment')
            && ($order->getCustomerComment() || $order->getCustomerNote())
        ) {
            $comment = Mage::helper('ordercomment')->escapeHtml(
                $order->getCustomerComment() ? $order->getCustomerComment() : $order->getCustomerNote()
            );
            $this->y -= 15;
            $page->drawText(Mage::helper('ordercomment')->__('Order Comment'), 35, $this->y, 'UTF-8');
            $this->y -= 15;
            $leftToPrint = explode(' ', $comment);
            $availableWidth = $page->getWidth();
            while (!empty($leftToPrint)) {
                $currentLine = $leftToPrint;
                $leftToPrint = array();
                while ($this->widthForStringUsingFontSize(
                        implode(' ', $currentLine), $page->getFont(), $page->getFontSize()
                    ) > $availableWidth) {
                    $leftToPrint[] = array_pop($currentLine);
                }
                $page->drawText(implode(' ', $currentLine), 35, $this->y, 'UTF-8');
            }
        }
        return $page;
    }

    protected function _printTableHead($page)
    {
        /* Add table head */
        $page->setFillColor(new Zend_Pdf_Color_GrayScale(0));
        $page->drawText(Mage::helper('sales')->__('Produktnavn'), 35, $this->y, 'UTF-8');
        $page->drawText(Mage::helper('sales')->__('Artikkelnr.'), 255, $this->y, 'UTF-8');
        $page->drawText(Mage::helper('sales')->__('Enhetspris'), 360, $this->y, 'UTF-8');
        $page->drawText(Mage::helper('sales')->__('Antall'), 430, $this->y, 'UTF-8');
        $page->drawText(Mage::helper('sales')->__('Sum'),535 , $this->y, 'UTF-8');
        $page->drawText(Mage::helper('sales')->__('Herav mva.'),470 , $this->y, 'UTF-8');

        $this->y -=15;
        return $page;
    }
    /**
     * Returns the total width in points of the string using the specified font and
     * size.
     *
     * This is not the most efficient way to perform this calculation. I'm
     * concentrating optimization efforts on the upcoming layout manager class.
     * Similar calculations exist inside the layout manager class, but widths are
     * generally calculated only after determining line fragments.
     *
     * @param  string $string
     * @param  Zend_Pdf_Resource_Font $font
     * @param  float $fontSize Font size in points
     * @return float
     */
    public function widthForStringUsingFontSize($string, $font, $fontSize)
    {
        $drawingString = '"libiconv"' == ICONV_IMPL ?
            iconv('UTF-8', 'UTF-16BE//IGNORE', $string) :
            @iconv('UTF-8', 'UTF-16BE', $string);

        $characters = array();
        for ($i = 0; $i < strlen($drawingString); $i++) {
            $characters[] = (ord($drawingString[$i++]) << 8) | ord($drawingString[$i]);
        }
        $glyphs = $font->glyphNumbersForCharacters($characters);
        $widths = $font->widthsForGlyphs($glyphs);
        $stringWidth = (array_sum($widths) / $font->getUnitsPerEm()) * $fontSize;
        return $stringWidth;

    }

    /**
     * Calculate coordinates to draw something in a column aligned to the right
     *
     * @param  string $string
     * @param  int $x
     * @param  int $columnWidth
     * @param  Zend_Pdf_Resource_Font $font
     * @param  int $fontSize
     * @param  int $padding
     * @return int
     */
    public function getAlignRight($string, $x, $columnWidth, Zend_Pdf_Resource_Font $font, $fontSize, $padding = 5)
    {
        $width = $this->widthForStringUsingFontSize($string, $font, $fontSize);
        return $x + $columnWidth - $width - $padding;
    }

    /**
     * Calculate coordinates to draw something in a column aligned to the center
     *
     * @param  string $string
     * @param  int $x
     * @param  int $columnWidth
     * @param  Zend_Pdf_Resource_Font $font
     * @param  int $fontSize
     * @return int
     */
    public function getAlignCenter($string, $x, $columnWidth, Zend_Pdf_Resource_Font $font, $fontSize)
    {
        $width = $this->widthForStringUsingFontSize($string, $font, $fontSize);
        return $x + round(($columnWidth - $width) / 2);
    }

    /**
     * Insert logo to pdf page
     *
     * @param Zend_Pdf_Page $page
     * @param null $store
     */
    protected function insertLogo(&$page, $store = null)
    {
        $this->y = $this->y ? $this->y : 815;
        $image = Mage::getStoreConfig('sales/identity/logo', $store);
        if ($image) {
            $image = Mage::getBaseDir('media') . '/sales/store/logo/' . $image;
            if (is_file($image)) {
                $image       = Zend_Pdf_Image::imageWithPath($image);
                $top         = 830; //top border of the page
                $widthLimit  = 270; //half of the page width
                $heightLimit = 270; //assuming the image is not a "skyscraper"
                $width       = $image->getPixelWidth();
                $height      = $image->getPixelHeight();

                //preserving aspect ratio (proportions)
                $ratio = $width / $height;
                if ($ratio > 1 && $width > $widthLimit) {
                    $width  = $widthLimit;
                    $height = $width / $ratio;
                } elseif ($ratio < 1 && $height > $heightLimit) {
                    $height = $heightLimit;
                    $width  = $height * $ratio;
                } elseif ($ratio == 1 && $height > $heightLimit) {
                    $height = $heightLimit;
                    $width  = $widthLimit;
                }

                $y1 = $top - $height;
                $y2 = $top;
                $x1 = 25;
                $x2 = $x1 + $width;

                //coordinates after transformation are rounded by Zend
                $page->drawImage($image, $x1, $y1, $x2, $y2);

                $this->y = $y1 - 10;
            }
        }
    }

    /**
     * Insert address to pdf page
     *
     * @param Zend_Pdf_Page $page
     * @param null $store
     */
    protected function insertAddress(&$page, $store = null)
    {
        $page->setFillColor(new Zend_Pdf_Color_GrayScale(0));
        $font = $this->_setFontRegular($page, 10);
        $page->setLineWidth(0);
        $this->y = $this->y ? $this->y : 815;
        $top = 815;
        foreach (explode("\n", Mage::getStoreConfig('sales/identity/address', $store)) as $value){
            if ($value !== '') {
                $value = preg_replace('/<br[^>]*>/i', "\n", $value);
                foreach (Mage::helper('core/string')->str_split($value, 45, true, true) as $_value) {
                    $page->drawText(trim(strip_tags($_value)),
                        $this->getAlignRight($_value, 130, 440, $font, 10),
                        $top,
                        'UTF-8');
                    $top -= 10;
                }
            }
        }
        $this->y = ($this->y > $top) ? $top : $this->y;
    }

    /**
     * Format address
     *
     * @param  string $address
     * @return array
     */
    protected function _formatAddress($address)
    {
        $return = array();
        foreach (explode('|', $address) as $str) {
            foreach (Mage::helper('core/string')->str_split($str, 45, true, true) as $part) {
                if (empty($part)) {
                    continue;
                }
                $return[] = $part;
            }
        }
        return $return;
    }

    /**
     * Calculate address height
     *
     * @param  array $address
     * @return int Height
     */
    protected function _calcAddressHeight($address)
    {
        $y = 0;
        foreach ($address as $value){
            if ($value !== '') {
                $text = array();
                foreach (Mage::helper('core/string')->str_split($value, 55, true, true) as $_value) {
                    $text[] = $_value;
                }
                foreach ($text as $part) {
                    $y += 15;
                }
            }
        }
        return $y;
    }

    /**
     * Insert order to pdf page
     *
     * @param Zend_Pdf_Page $page
     * @param Mage_Sales_Model_Order $obj
     * @param bool $putOrderId
     */
    protected function insertOrder(&$page, $obj, $putOrderId = true)
    {
        if ($obj instanceof Mage_Sales_Model_Order) {
            $shipment = null;
            $order = $obj;
        } elseif ($obj instanceof Mage_Sales_Model_Order_Shipment) {
            $shipment = $obj;
            $order = $shipment->getOrder();
        }

        $this->y = $this->y ? $this->y : 815;
        $top = $this->y;
        Mage::log($top, null, 'address.log');

        $page->setFillColor(new Zend_Pdf_Color_GrayScale(1));
        $page->setLineColor(new Zend_Pdf_Color_GrayScale(1));
        $page->drawRectangle(25, $top, 570, $top - 115);
        $page->setFillColor(new Zend_Pdf_Color_GrayScale(0));
        $this->setDocHeaderCoordinates(array(25, $top, 570, $top - 115));
        $this->_setFontBold($page, 20);

        if ($putOrderId) {
            $page->drawText(
                Mage::helper('sales')->__('VAKTROMMET A\S'), 35, ($top - 50), 'UTF-8'
            );
        }

        $storeAddress = Mage::helper('sales')->__("
		VAKTROMMET A\S
		Myrhaugen 17 C, 0752 Oslo
		Tlf.: +47 92697497
		post@vaktrommet.no
		http://www.vaktrommet.no
		Org. nr.: NO 996263274 MVA Foretaksregisteret");

        $top1 = $top-15;
		$i = 1;
		/*$storeAddress = Mage::getStoreConfig('general/store_information/address', null)*/
        foreach (explode("\n", $storeAddress) as $value)
        {
        	if($i == 1)
		        $font = $this->_setFontBold($page, 12);
		    else
		        $font = $this->_setFontRegular($page, 12);
            if ($value !== '') {
                $value = preg_replace('/<br[^>]*>/i', "\n", $value);
                foreach (Mage::helper('core/string')->str_split($value, 45, true, true) as $_value)
                {
                    $page->drawText(trim(strip_tags($_value)),
                        325,
                        $top1,
                        'UTF-8');
                    $top1 -= 15;
                }
    		$i++;
            }
        }

        $page->setLineColor(new Zend_Pdf_Color_GrayScale(0));
        $page->drawLine(25, $top1+10, 570, $top1+10);
		$font = $this->_setFontBold($page, 20);
		$page->drawText(trim("Ordrebekreftelse"),35, $top1-=20,'UTF-8');
        /*Mage::log("TOP1:".$top1, null, 'address.log');
        Mage::log("TOP:".$top, null, 'address.log');*/
        $top = $top1;
        $top -= 20;

        $page->setFillColor(new Zend_Pdf_Color_GrayScale(1));
        $page->setLineColor(new Zend_Pdf_Color_GrayScale(1));
        $page->setLineWidth(0.5);
        $page->drawRectangle(25, $top, 275, ($top - 25));
        $page->drawRectangle(275, $top, 570, ($top - 25));
        
        /* Calculate blocks info */

        /* Billing Address */
        $billingAddress = $this->_formatAddress($order->getBillingAddress()->format('pdf'));

        /* Payment */
        $paymentInfo = Mage::helper('payment')->getInfoBlock($order->getPayment())
            ->setIsSecureMode(true)
            ->toPdf();
        $paymentInfo = htmlspecialchars_decode($paymentInfo, ENT_QUOTES);
        $payment = explode('{{pdf_row_separator}}', $paymentInfo);
        foreach ($payment as $key=>$value){
            if (strip_tags(trim($value)) == '') {
                unset($payment[$key]);
            }
        }
        reset($payment);

        /* Shipping Address and Method */
        if (!$order->getIsVirtual()) {
            /* Shipping Address */
            $shippingAddress = $this->_formatAddress($order->getShippingAddress()->format('pdf'));
            $shippingMethod  = $order->getShippingDescription();
        }

        $page->setFillColor(new Zend_Pdf_Color_GrayScale(0));
        $this->_setFontBold($page, 12);
        $page->drawText(Mage::helper('sales')->__('Ordreinformasjon'), 35, ($top - 15), 'UTF-8');

        $page->drawText(Mage::helper('sales')->__('Kundeopplysninger'), 325, ($top - 15), 'UTF-8');

        $addressesHeight = $this->_calcAddressHeight($billingAddress);
        if (isset($shippingAddress)) {
            $addressesHeight = max($addressesHeight, $this->_calcAddressHeight($shippingAddress));
        }

        $page->setFillColor(new Zend_Pdf_Color_GrayScale(1));
        $page->drawRectangle(25, ($top - 25), 570, $top - 33 - $addressesHeight);
        $page->setFillColor(new Zend_Pdf_Color_GrayScale(0));
        $this->_setFontRegular($page, 11);
        $this->y = $top - 40;
        $addressesStartY = $this->y;
		
		$timeLapseBegin = $order->getCreatedAt();
		$dateTimestamp = Mage::getModel('core/date')->timestamp(strtotime($timeLapseBegin));
		$currentDate = date('d.m.Y', $dateTimestamp);
		$payment_method = $order->getPayment()->getMethodInstance()->getTitle();

        /*print"<pre>";
        print_r($billingAddress);
        print"<pre>";*/
        $orderInfo  = "
			Ordrenr.: ".$order->getIncrementId()."
			Bestillingsdato: ".$currentDate."
			Ordrestatus: ".Mage::helper('sales')->__($order->getStatus())."
			Betalingsmåte: ".Mage::helper('payment')->__($payment_method)."
			Valuta: ".$order->getOrderCurrencyCode()."
        ";
        foreach (explode("\n", $orderInfo) as $value){
            if ($value !== '') {
                $value = preg_replace('/<br[^>]*>/i', "\n", $value);
                foreach (Mage::helper('core/string')->str_split($value, 45, true, true) as $_value)
                {
                    $page->drawText(trim(strip_tags($_value)),
                        35,
                        $this->y,
                        'UTF-8');
                    $this->y -= 15;
                }
            }
        }

        $addressesEndY = $this->y;
        $ij = 0;
        foreach ($billingAddress as $value)
        {
        	$billingAddress[$ij] = $value;
        	if($ij == 2)
        	{
        		$billingAddress[1]  = $billingAddress[1]." ".$billingAddress[$ij];
	        	unset($billingAddress[$ij]);
        	}
        	if($ij == 3)
        	{
        		$billingAddress[1]  = $billingAddress[1]." ".$billingAddress[$ij];
	        	unset($billingAddress[$ij]);
        	}
        	$ij++;
        }
        
            $this->y = $addressesStartY;
	        $billingC = 0;
	        foreach ($billingAddress as $value){
	            if ($value !== '') {
	                $text = array();
	                foreach (Mage::helper('core/string')->str_split($value, 45, true, true) as $_value) {
	                    $text[] = $_value;
	                }
	                foreach ($text as $part) {
	                	switch ($billingC) 
	                	{
	                		case '0':
	                			$billHead = 'Navn: ';
	                			break;
	                		
	                		case '1':
	                			$billHead = 'Adresse: ';
                                if(strpos($part,"T: "))
                                {
                                    $billHead = 'Telefon: ';
                                    $part = str_replace("T: ", "", $part);
                                }
	                			break;

	                		case '2':
	                			$billHead = 'Adresse: ';
                                if(strpos($part,"T: "))
                                {
                                    $billHead = 'Telefon: ';
                                    $part = str_replace("T: ", "", $part);
                                }
	                			break;

	                		case '3':
	                			$billHead = 'Telefon: ';
	                			$part = str_replace("T: ", "", $part);
	                			break;

	                	}
	                    $page->drawText($billHead.strip_tags(ltrim($part)), 325, $this->y, 'UTF-8');
	                    $this->y -= 15;
	                }
	            }
	            $billingC++;
	        }

        	$customer_email = $order->getCustomerEmail();
            $page->drawText("Epost: ".strip_tags(ltrim($customer_email)), 325, $this->y, 'UTF-8');
            $this->y -= 15;

            $addressesEndY = min($addressesEndY, $this->y);
            $this->y = $addressesEndY;

            $page->setFillColor(new Zend_Pdf_Color_Rgb(0.00, 0.00, 0.00));
            /*$page->setLineWidth(0.5);
            $page->drawRectangle(25, $this->y, 275, $this->y-25);
            $page->drawRectangle(275, $this->y, 570, $this->y-25);*/

            $this->y -= 15;
            $this->_setFontBold($page, 12);
            $page->setFillColor(new Zend_Pdf_Color_GrayScale(0));
            /*$page->drawText(Mage::helper('sales')->__('Payment Method'), 35, $this->y, 'UTF-8');
            $page->drawText(Mage::helper('sales')->__('Shipping Method:'), 285, $this->y , 'UTF-8');*/

            $this->y -=10;
            $page->setFillColor(new Zend_Pdf_Color_GrayScale(1));

            $this->_setFontRegular($page, 10);
            $page->setFillColor(new Zend_Pdf_Color_GrayScale(0));

            $paymentLeft = 35;
            $yPayments   = $this->y - 15;

	       /* foreach ($payment as $value){
	            if (trim($value) != '') {
	                //Printing "Payment Method" lines
	                $value = preg_replace('/<br[^>]*>/i', "\n", $value);
	                foreach (Mage::helper('core/string')->str_split($value, 45, true, true) as $_value) {
	                    $page->drawText(strip_tags(trim($_value)), $paymentLeft, $yPayments, 'UTF-8');
	                    $yPayments -= 15;
	                }
	            }
	        }*/

	        /*if ($order->getIsVirtual())
	        {

	            // replacement of Shipments-Payments rectangle block
	            $yPayments = min($addressesEndY, $yPayments);
	            $page->drawLine(25,  ($top - 25), 25,  $yPayments);
	            $page->drawLine(570, ($top - 25), 570, $yPayments);
	            $page->drawLine(25,  $yPayments,  570, $yPayments);

	            $this->y = $yPayments - 15;
	        }
	        else
	        {
	            $topMargin    = 15;
	            $methodStartY = $this->y;
	            $this->y     -= 15;

	            foreach (Mage::helper('core/string')->str_split($shippingMethod, 45, true, true) as $_value) {
	                $page->drawText(strip_tags(trim($_value)), 285, $this->y, 'UTF-8');
	                $this->y -= 15;
	            }

	            $yShipments = $this->y;
	            $totalShippingChargesText = "(" . Mage::helper('sales')->__('Total Shipping Charges') . " "
	                . $order->formatPriceTxt($order->getShippingAmount()) . ")";

	            $page->drawText($totalShippingChargesText, 285, $yShipments - $topMargin, 'UTF-8');
	            $yShipments -= $topMargin + 10;

	            $tracks = array();
	            if ($shipment) {
	                $tracks = $shipment->getAllTracks();
	            }
	            if (count($tracks)) {
	                $page->setFillColor(new Zend_Pdf_Color_Rgb(0.93, 0.92, 0.92));
	                $page->setLineWidth(0.5);
	                $page->drawRectangle(285, $yShipments, 510, $yShipments - 10);
	                $page->drawLine(400, $yShipments, 400, $yShipments - 10);
	                //$page->drawLine(510, $yShipments, 510, $yShipments - 10);

	                $this->_setFontRegular($page, 9);
	                $page->setFillColor(new Zend_Pdf_Color_GrayScale(0));
	                //$page->drawText(Mage::helper('sales')->__('Carrier'), 290, $yShipments - 7 , 'UTF-8');
	                $page->drawText(Mage::helper('sales')->__('Title'), 290, $yShipments - 7, 'UTF-8');
	                $page->drawText(Mage::helper('sales')->__('Number'), 410, $yShipments - 7, 'UTF-8');

	                $yShipments -= 20;
	                $this->_setFontRegular($page, 8);
	                foreach ($tracks as $track) {

	                    $CarrierCode = $track->getCarrierCode();
	                    if ($CarrierCode != 'custom') {
	                        $carrier = Mage::getSingleton('shipping/config')->getCarrierInstance($CarrierCode);
	                        $carrierTitle = $carrier->getConfigData('title');
	                    } else {
	                        $carrierTitle = Mage::helper('sales')->__('Custom Value');
	                    }

	                    //$truncatedCarrierTitle = substr($carrierTitle, 0, 35) . (strlen($carrierTitle) > 35 ? '...' : '');
	                    $maxTitleLen = 45;
	                    $endOfTitle = strlen($track->getTitle()) > $maxTitleLen ? '...' : '';
	                    $truncatedTitle = substr($track->getTitle(), 0, $maxTitleLen) . $endOfTitle;
	                    //$page->drawText($truncatedCarrierTitle, 285, $yShipments , 'UTF-8');
	                    $page->drawText($truncatedTitle, 292, $yShipments , 'UTF-8');
	                    $page->drawText($track->getNumber(), 410, $yShipments , 'UTF-8');
	                    $yShipments -= $topMargin - 5;
	                }
	            } else {
	                $yShipments -= $topMargin - 5;
	            }

	            $currentY = min($yPayments, $yShipments);

	            // replacement of Shipments-Payments rectangle block
	            $page->drawLine(25,  $methodStartY, 25,  $currentY); //left
	            $page->drawLine(25,  $currentY,     570, $currentY); //bottom
	            $page->drawLine(570, $currentY,     570, $methodStartY); //right

	            $this->y = $currentY;
	            $this->y -= 15;
	        }*/
    }

    /**
     * Insert title and number for concrete document type
     *
     * @param  Zend_Pdf_Page $page
     * @param  string $text
     * @return void
     */
    public function insertDocumentNumber(Zend_Pdf_Page $page, $text)
    {
        $page->setFillColor(new Zend_Pdf_Color_GrayScale(1));
        $this->_setFontRegular($page, 10);
        $docHeader = $this->getDocHeaderCoordinates();
        $page->drawText($text, 35, $docHeader[1] - 15, 'UTF-8');
    }

    /**
     * Sort totals list
     *
     * @param  array $a
     * @param  array $b
     * @return int
     */
    protected function _sortTotalsList($a, $b) {
        if (!isset($a['sort_order']) || !isset($b['sort_order'])) {
            return 0;
        }

        if ($a['sort_order'] == $b['sort_order']) {
            return 0;
        }

        return ($a['sort_order'] > $b['sort_order']) ? 1 : -1;
    }

    /**
     * Return total list
     *
     * @param  Mage_Sales_Model_Abstract $source
     * @return array
     */
    protected function _getTotalsList($source)
    {
        $totals = Mage::getConfig()->getNode('global/pdf/totals')->asArray();
        usort($totals, array($this, '_sortTotalsList'));
        $totalModels = array();
        foreach ($totals as $index => $totalInfo) {
            if (!empty($totalInfo['model'])) {
                $totalModel = Mage::getModel($totalInfo['model']);
                if ($totalModel instanceof Mage_Sales_Model_Order_Pdf_Total_Default) {
                    $totalInfo['model'] = $totalModel;
                } else {
                    Mage::throwException(
                        Mage::helper('sales')->__('PDF total model should extend Mage_Sales_Model_Order_Pdf_Total_Default')
                    );
                }
            } else {
                $totalModel = Mage::getModel($this->_defaultTotalModel);
            }
            $totalModel->setData($totalInfo);
            $totalModels[] = $totalModel;
        }

        return $totalModels;
    }

    /**
     * Insert totals to pdf page
     *
     * @param  Zend_Pdf_Page $page
     * @param  Mage_Sales_Model_Abstract $source
     * @return Zend_Pdf_Page
     */
    protected function insertTotals($page, $source){
        $order = $source->getOrder();
        $totals = $this->_getTotalsList($source);
        $lineBlock = array(
            'lines'  => array(),
            'height' => 15
        );
        foreach ($totals as $total) {
            $total->setOrder($order)
                ->setSource($source);

            if ($total->canDisplay()) {
                $total->setFontSize(10);
                foreach ($total->getTotalsForDisplay() as $totalData) {
                    
                    switch ($totalData['label'])
                    {
                        case 'Subtotal:':
                            $totalData['label']  = 'Sum varer';
                            break;

                        case 'Shipping & Handling:':
                            /* Shipping Address and Method */
                            $shippingMethod = '';
                            if (!$order->getIsVirtual())
                                $shippingMethod  = $order->getShippingDescription();
                            $totalData['label']  = 'Frakt: '.$shippingMethod;
                            break;

                        case 'Grand Total:':
                            $totalData['label']  = 'Sum total';
                            break;
                        
                        default:
                            # code...
                            break;
                    }
                    $lineBlock['lines'][] = array(
                        array(
                            'text'      => $totalData['label'],
                            'feed'      => 35,
                            'align'     => 'left',
                            'font_size' => $totalData['font_size'],
                            'font'      => 'bold',
                            'drawLineBelow' => true,
                        ),
                        array(
                            'text'      => $totalData['amount'],
                            'feed'      => 565,
                            'align'     => 'right',
                            'font_size' => $totalData['font_size'],
                            'font'      => 'bold'
                        ),
                    );
                }
            }
        }

        $this->y -= 20;
        $page = $this->drawLineBlocks($page, array($lineBlock));
        return $page;
    }

    /**
     * Parse item description
     *
     * @param  Varien_Object $item
     * @return array
     */
    protected function _parseItemDescription($item)
    {
        $matches = array();
        $description = $item->getDescription();
        if (preg_match_all('/<li.*?>(.*?)<\/li>/i', $description, $matches)) {
            return $matches[1];
        }

        return array($description);
    }

    /**
     * Before getPdf processing
     */
    protected function _beforeGetPdf() {
        $translate = Mage::getSingleton('core/translate');
        /* @var $translate Mage_Core_Model_Translate */
        $translate->setTranslateInline(false);
    }

    /**
     * After getPdf processing
     */
    protected function _afterGetPdf() {
        $translate = Mage::getSingleton('core/translate');
        /* @var $translate Mage_Core_Model_Translate */
        $translate->setTranslateInline(true);
    }

    /**
     * Format option value process
     *
     * @param  array|string $value
     * @param  Mage_Sales_Model_Order $order
     * @return string
     */
    protected function _formatOptionValue($value, $order)
    {
        $resultValue = '';
        if (is_array($value)) {
            if (isset($value['qty'])) {
                $resultValue .= sprintf('%d', $value['qty']) . ' x ';
            }

            $resultValue .= $value['title'];

            if (isset($value['price'])) {
                $resultValue .= " " . $order->formatPrice($value['price']);
            }
            return  $resultValue;
        } else {
            return $value;
        }
    }

    /**
     * Initialize renderer process
     *
     * @param string $type
     */
    protected function _initRenderer($type)
    {
        $node = Mage::getConfig()->getNode('global/pdf/' . $type);
        foreach ($node->children() as $renderer) {
            $this->_renderers[$renderer->getName()] = array(
                'model'     => (string)$renderer,
                'renderer'  => null
            );
        }
    }

    /**
     * Retrieve renderer model
     *
     * @param  string $type
     * @throws Mage_Core_Exception
     * @return Mage_Sales_Model_Order_Pdf_Items_Abstract
     */
    protected function _getRenderer($type)
    {
        if (!isset($this->_renderers[$type])) {
            $type = 'default';
        }

        if (!isset($this->_renderers[$type])) {
            Mage::throwException(Mage::helper('sales')->__('Invalid renderer model'));
        }

        if (is_null($this->_renderers[$type]['renderer'])) {
            $this->_renderers[$type]['renderer'] = Mage::getSingleton($this->_renderers[$type]['model']);
        }

        return $this->_renderers[$type]['renderer'];
    }

    /**
     * Public method of protected @see _getRenderer()
     *
     * Retrieve renderer model
     *
     * @param  string $type
     * @return Mage_Sales_Model_Order_Pdf_Items_Abstract
     */
    public function getRenderer($type)
    {
        return $this->_getRenderer($type);
    }

    /**
     * Render item
     *
     * @param Varien_Object $item
     * @param Zend_Pdf_Page $page
     * @param Mage_Sales_Model_Order $order
     * @param Mage_Sales_Model_Order_Pdf_Items_Abstract $renderer
     *
     * @return Mage_Sales_Model_Order_Pdf_Abstract
     */
    public function renderItem(Varien_Object $item, Zend_Pdf_Page $page, Mage_Sales_Model_Order $order, $renderer)
    {
        $renderer->setOrder($order)
            ->setItem($item)
            ->setPdf($this)
            ->setPage($page)
            ->setRenderedModel($this)
            ->draw();

        return $this;
    }

    /**
     * Draw Item process
     *
     * @param  Varien_Object $item
     * @param  Zend_Pdf_Page $page
     * @param  Mage_Sales_Model_Order $order
     * @return Zend_Pdf_Page
     */
    protected function _drawItem(Varien_Object $item, Zend_Pdf_Page $page, Mage_Sales_Model_Order $order)
    {
        $orderItem = $item->getOrderItem();
        $type = $orderItem->getProductType();
        $renderer = $this->_getRenderer($type);

        $this->renderItem($item, $page, $order, $renderer);

        $transportObject = new Varien_Object(array('renderer_type_list' => array()));
        Mage::dispatchEvent('pdf_item_draw_after', array(
            'transport_object' => $transportObject,
            'entity_item'      => $item
        ));
/*        print"<pre>";
        print_r($transportObject->getRendererTypeList());
        print"</pre>";*/
        foreach ($transportObject->getRendererTypeList() as $type) {
            $renderer = $this->_getRenderer($type);
            if ($renderer) {
                $this->renderItem($orderItem, $page, $order, $renderer);
            }
        }

        return $renderer->getPage();
    }

    /**
     * Set font as regular
     *
     * @param  Zend_Pdf_Page $object
     * @param  int $size
     * @return Zend_Pdf_Resource_Font
     */
    protected function _setFontRegular($object, $size = 7)
    {
        $font = Zend_Pdf_Font::fontWithPath(Mage::getBaseDir() . '/lib/LinLibertineFont/LinLibertine_Re-4.4.1.ttf');
        $object->setFont($font, $size);
        return $font;
    }

    /**
     * Set font as bold
     *
     * @param  Zend_Pdf_Page $object
     * @param  int $size
     * @return Zend_Pdf_Resource_Font
     */
    protected function _setFontBold($object, $size = 7)
    {
        $font = Zend_Pdf_Font::fontWithPath(Mage::getBaseDir() . '/lib/LinLibertineFont/LinLibertine_Bd-2.8.1.ttf');
        $object->setFont($font, $size);
        return $font;
    }

    /**
     * Set font as italic
     *
     * @param  Zend_Pdf_Page $object
     * @param  int $size
     * @return Zend_Pdf_Resource_Font
     */
    protected function _setFontItalic($object, $size = 7)
    {
        $font = Zend_Pdf_Font::fontWithPath(Mage::getBaseDir() . '/lib/LinLibertineFont/LinLibertine_It-2.8.2.ttf');
        $object->setFont($font, $size);
        return $font;
    }

    /**
     * Set PDF object
     *
     * @param  Zend_Pdf $pdf
     * @return Mage_Sales_Model_Order_Pdf_Abstract
     */
    protected function _setPdf(Zend_Pdf $pdf)
    {
        $this->_pdf = $pdf;
        return $this;
    }

    /**
     * Retrieve PDF object
     *
     * @throws Mage_Core_Exception
     * @return Zend_Pdf
     */
    protected function _getPdf()
    {
        if (!$this->_pdf instanceof Zend_Pdf) {
            Mage::throwException(Mage::helper('sales')->__('Please define PDF object before using.'));
        }

        return $this->_pdf;
    }

    /**
     * Create new page and assign to PDF object
     *
     * @param  array $settings
     * @return Zend_Pdf_Page
     */
    public function newPage(array $settings = array())
    {
        $pageSize = !empty($settings['page_size']) ? $settings['page_size'] : Zend_Pdf_Page::SIZE_A4;
        $page = $this->_getPdf()->newPage($pageSize);
        $this->_getPdf()->pages[] = $page;
        $this->y = 800;

        return $page;
    }

    /**
     * Draw lines
     *
     * draw items array format:
     * lines        array;array of line blocks (required)
     * shift        int; full line height (optional)
     * height       int;line spacing (default 10)
     *
     * line block has line columns array
     *
     * column array format
     * text         string|array; draw text (required)
     * feed         int; x position (required)
     * font         string; font style, optional: bold, italic, regular
     * font_file    string; path to font file (optional for use your custom font)
     * font_size    int; font size (default 7)
     * align        string; text align (also see feed parametr), optional left, right
     * height       int;line spacing (default 10)
     *
     * @param  Zend_Pdf_Page $page
     * @param  array $draw
     * @param  array $pageSettings
     * @throws Mage_Core_Exception
     * @return Zend_Pdf_Page
     */
    public function drawLineBlocks(Zend_Pdf_Page $page, array $draw, array $pageSettings = array())
    {
        foreach ($draw as $itemsProp) {
            if (!isset($itemsProp['lines']) || !is_array($itemsProp['lines'])) {
                Mage::throwException(Mage::helper('sales')->__('Invalid draw line data. Please define "lines" array.'));
            }
            $lines  = $itemsProp['lines'];
            $height = isset($itemsProp['height']) ? $itemsProp['height'] : 10;

            if (empty($itemsProp['shift'])) {
                $shift = 0;
                foreach ($lines as $line) {
                    $maxHeight = 0;
                    foreach ($line as $column) {
                        $lineSpacing = !empty($column['height']) ? $column['height'] : $height;
                        if (!is_array($column['text'])) {
                            $column['text'] = array($column['text']);
                        }
                        $top = 0;
                        foreach ($column['text'] as $part) {
                            $top += $lineSpacing;
                        }

                        $maxHeight = $top > $maxHeight ? $top : $maxHeight;
                    }
                    $shift += $maxHeight;
                }
                $itemsProp['shift'] = $shift;
            }

            if ($this->y - $itemsProp['shift'] < 15) {
                $page = $this->newPage($pageSettings);
            }

            foreach ($lines as $line) {
                $maxHeight = 0;
                foreach ($line as $column) {
                    $fontSize = empty($column['font_size']) ? 10 : $column['font_size'];
                    if (!empty($column['font_file'])) {
                        $font = Zend_Pdf_Font::fontWithPath($column['font_file']);
                        $page->setFont($font, $fontSize);
                    } else {
                        $fontStyle = empty($column['font']) ? 'regular' : $column['font'];
                        switch ($fontStyle) {
                            case 'bold':
                                $font = $this->_setFontBold($page, $fontSize);
                                break;
                            case 'italic':
                                $font = $this->_setFontItalic($page, $fontSize);
                                break;
                            default:
                                $font = $this->_setFontRegular($page, $fontSize);
                                break;
                        }
                    }

                    if (!is_array($column['text'])) {
                        $column['text'] = array($column['text']);
                    }

                    $lineSpacing = !empty($column['height']) ? $column['height'] : $height;
                    $top = 0;
                    foreach ($column['text'] as $part) {
                        if ($this->y - $lineSpacing < 15) {
                            $page = $this->newPage($pageSettings);
                        }

                        $feed = $column['feed'];
                        $textAlign = empty($column['align']) ? 'left' : $column['align'];
                        $width = empty($column['width']) ? 0 : $column['width'];
                        switch ($textAlign) {
                            case 'right':
                                if ($width) {
                                    $feed = $this->getAlignRight($part, $feed, $width, $font, $fontSize);
                                }
                                else {
                                    $feed = $feed - $this->widthForStringUsingFontSize($part, $font, $fontSize);
                                }
                                break;
                            case 'center':
                                if ($width) {
                                    $feed = $this->getAlignCenter($part, $feed, $width, $font, $fontSize);
                                }
                                break;
                        }
                        $page->drawText($part, $feed, $this->y-$top, 'UTF-8');
                        
                        if(isset($column['drawLineBelow']) && $column['drawLineBelow'] ==1)
                        {
                            $page->setLineColor(new Zend_Pdf_Color_GrayScale(0));
                            $page->drawLine(25, $this->y-$top-5, 570, $this->y-$top-5);
                        }

                        $top += $lineSpacing;
                    }

                    $maxHeight = $top > $maxHeight ? $top : $maxHeight;
                }
                $this->y -= $maxHeight;
            }
        }

        return $page;
    }
    /**
     * Draw header for item table
     *
     * @param Zend_Pdf_Page $page
     * @return void
     */
    protected function _drawHeader(Zend_Pdf_Page $page)
    {
        /* Add table head */
        $this->_setFontRegular($page, 10);
        $page->setFillColor(new Zend_Pdf_Color_RGB(0.93, 0.92, 0.92));
        $page->setLineColor(new Zend_Pdf_Color_GrayScale(0.5));
        $page->setLineWidth(0.5);
        $page->drawRectangle(25, $this->y, 570, $this->y -15);
        $this->y -= 10;
        $page->setFillColor(new Zend_Pdf_Color_RGB(0, 0, 0));

        //columns headers
        $lines[0][] = array(
            'text' => Mage::helper('sales')->__('Produktnavn'),
            'feed' => 35
        );

        $lines[0][] = array(
            'text'  => Mage::helper('sales')->__('Artikkelnr.'),
            'feed'  => 290,
            'align' => 'right'
        );

        $lines[0][] = array(
            'text'  => Mage::helper('sales')->__('Antall'),
            'feed'  => 435,
            'align' => 'right'
        );

        $lines[0][] = array(
            'text'  => Mage::helper('sales')->__('Enhetspris'),
            'feed'  => 360,
            'align' => 'right'
        );

        $lines[0][] = array(
            'text'  => Mage::helper('sales')->__('Sum'),
            'feed'  => 565,
            'align' => 'right'
        );

        $lines[0][] = array(
            'text'  => Mage::helper('sales')->__('Herav mva.'),
            'feed'  => 495,
            'align' => 'right'
        );

        $lineBlock = array(
            'lines'  => $lines,
            'height' => 5
        );

        $this->drawLineBlocks($page, array($lineBlock), array('table_header' => true));
        $page->setFillColor(new Zend_Pdf_Color_GrayScale(0));
        $this->y -= 20;
    }
}