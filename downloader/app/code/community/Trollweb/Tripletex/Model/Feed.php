<?php
class Trollweb_Tripletex_Model_Feed extends Mage_AdminNotification_Model_Feed
{
	const XML_FEED_URL_PATH     = 'tripletex/tripletex_settings/feed_url';
    const XML_FREQUENCY_PATH    = 'tripletex/tripletex_settings/frequency';

    /**
     * Feed url
     *
     * @var string
     */
    protected $_feedUrl;

    /**
     * Init model
     *
     */
    protected function _construct()
    {}

    /**
     * Retrieve feed url
     *
     * @return string
     */
    public function getFeedUrl()
    {
        if (is_null($this->_feedUrl)) {
			$this->_feedUrl = Mage::getStoreConfig(self::XML_FEED_URL_PATH);
		}
        return $this->_feedUrl;
    }
    /**
     * Check feed for modification
     *
     * @return Mage_AdminNotification_Model_Feed
     */
    public function checkUpdate()
    {
        if (($this->getFrequency() + $this->getLastUpdate()) > time()) {
            return $this;
        }

        $feedData = array();

        $feedXml = $this->getFeedData();


        if ($feedXml && $feedXml->channel && $feedXml->channel->item) {
            foreach ($feedXml->channel->item as $item) {
                $feedData[] = array(
                    'severity'      => (int)$item->severity,
                    'date_added'    => $this->getDate(time()),
                    'title'         => (string)$item->title,
                    'description'   => (string)$item->description,
                    'url'           => (string)$item->link,
                );
            }

            if ($feedData) {
                Mage::getModel('adminnotification/inbox')->parse(array_reverse($feedData));
            }

        }
        $this->setLastUpdate();

        return $this;
    }

    /**
     * Retrieve DB date from RSS date
     *
     * @param string $rssDate
     * @return string YYYY-MM-DD YY:HH:SS
     */
    public function getDate($time)
    {
        return gmdate('Y-m-d H:i:s', $time);
    }

    /**
     * Retrieve Update Frequency
     *
     * @return int
     */
    public function getFrequency()
    {
        return Mage::getStoreConfig(self::XML_FREQUENCY_PATH) * 3600;
    }

    /**
     * Retrieve Last update time
     *
     * @return int
     */
    public function getLastUpdate()
    {
        return Mage::app()->loadCache('tripletex_notifications_lastcheck');
    }

    /**
     * Set last update time (now)
     *
     * @return Mage_AdminNotification_Model_Feed
     */
    public function setLastUpdate()
    {
        Mage::app()->saveCache(time(), 'tripletex_notifications_lastcheck');
        return $this;
    }

    /**
     * Retrieve feed data as XML element
     *
     * @return SimpleXMLElement
     */
    public function getFeedData()
    {
        $curl = new Varien_Http_Adapter_Curl();
        $curl->setConfig(array(
            'timeout'   => 2
        ));
        $curl->write(Zend_Http_Client::GET, $this->getFeedUrl(), '1.0');
        $data = $curl->read();
        if ($data === false) {
            return false;
        } else {
			//Done for some pages where HTTP 301 redirects are not being parsed properly by PHP or by some other reasons. We just make sure here that 301 redirects are being processed. It's for 1 redirect only.
			$newLocation = $this->get301($data);
			if($newLocation) {
				$curl->write(Zend_Http_Client::GET, $newLocation, '1.0');
				$data = $curl->read();
			}
		}
        $data = preg_split('/^\r?$/m', $data, 2);
        $data = trim($data[1]);
        $curl->close();

        try {
            $xml  = new SimpleXMLElement($data);
        }
        catch (Exception $e) {
            return false;
        }

        return $xml;
    }

    public function getFeedXml()
    {
        try {
            $data = $this->getFeedData();
            $xml  = new SimpleXMLElement($data);
        }
        catch (Exception $e) {
            $xml  = new SimpleXMLElement('<?xml version="1.0" encoding="utf-8" ?>');
        }

        return $xml;
    }

	function get301($data)
	{
		$newLocation = false;
	   
		// Test for 301 or 302
		if(preg_match('/^HTTP\/\d\.\d\s+(301|302)/', $data))
		{
			$headers = explode("\n", $data);
			foreach($headers as $value)
			{
				if(substr(strtolower($value), 0, 9) == "location:")
				{
					$newLocation = trim(substr($value, 9, strlen($value)));
				}
			}
		}

		return $newLocation;
	}
}
