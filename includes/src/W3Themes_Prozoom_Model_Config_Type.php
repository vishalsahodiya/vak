<?php
/*------------------------------------------------------------------------
# APL Solutions and Vision Co., LTD
# ------------------------------------------------------------------------
# Copyright (C) 2008-2010 APL Solutions and Vision Co., LTD. All Rights Reserved.
# @license - Copyrighted Commercial Software
# Author: APL Solutions and Vision Co., LTD
# Websites: http://www.joomlavision.com/ - http://www.magentheme.com/
-------------------------------------------------------------------------*/ 
class W3Themes_Prozoom_Model_Config_Type
{

    public function toOptionArray()
    {
        return array(
            array('value'=>'inner', 'label'=>Mage::helper('adminhtml')->__('Inner')),
            array('value'=>'regular', 'label'=>Mage::helper('adminhtml')->__('Regular')),
        );
    }

}
