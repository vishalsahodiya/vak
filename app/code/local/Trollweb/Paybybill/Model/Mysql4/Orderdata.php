<?php

class Trollweb_Paybybill_Model_Mysql4_Orderdata extends Mage_Core_Model_Mysql4_Abstract {

    protected function _construct()
    {
        $this->_init('paybybill/orderdata', 'orderdata_id');
    }


}