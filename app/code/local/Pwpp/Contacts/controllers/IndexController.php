<?php
require_once ('Mage/Contacts/controllers/IndexController.php');
/**
 * Contacts index controller
 *
 * @category   Mage
 * @package    Mage_Contacts
 * @author      Magento Core Team <core@magentocommerce.com>
 */
class Pwpp_Contacts_IndexController extends Mage_Contacts_IndexController
{
    const XML_PATH_ADMIN_EMAIL_RECIPIENT = 'trans_email/ident_general/email';
    const XML_PATH_EMAIL_RECIPIENT  = 'contacts/email/recipient_email';
    const XML_PATH_EMAIL_SENDER     = 'contacts/email/sender_email_identity';
    const XML_PATH_EMAIL_TEMPLATE   = 'contacts/email/email_template';
    const EMAIL_AUTOREPLY_TEMPLATE   = 'contacts_email_autoreply_template';
    const XML_PATH_ENABLED          = 'contacts/contacts/enabled';

    public function postAction()
    {

        $post = $this->getRequest()->getPost();
        if ( $post ) {
            $translate = Mage::getSingleton('core/translate');
            /* @var $translate Mage_Core_Model_Translate */
            $translate->setTranslateInline(false);
            try {
                $postObject = new Varien_Object();
                $postObject->setData($post);

                $error = false;

                if (!Zend_Validate::is(trim($post['name']) , 'NotEmpty')) {
                    $error = true;
                }

                if (!Zend_Validate::is(trim($post['comment']) , 'NotEmpty')) {
                    $error = true;
                }

                if (!Zend_Validate::is(trim($post['email']), 'EmailAddress')) {
                    $error = true;
                }

                if (Zend_Validate::is(trim($post['hideit']), 'NotEmpty')) {
                    $error = true;
                }

                if ($error) {
                    throw new Exception();
                }
                // Sends message to store owner
                $mailTemplate = Mage::getModel('core/email_template');
                /* @var $mailTemplate Mage_Core_Model_Email_Template */

                $sender = array();
                $sender['name']  = $post['name'];
                $sender['email'] = $post['email'];

                $mailTemplate->setDesignConfig(array('area' => 'frontend'))
                    ->setReplyTo($post['email'])
                    ->sendTransactional(
                        Mage::getStoreConfig(self::XML_PATH_EMAIL_TEMPLATE),
                        $sender,
                        Mage::getStoreConfig(self::XML_PATH_EMAIL_RECIPIENT),
                        null,
                        array('data' => $postObject)
                    );

                if (!$mailTemplate->getSentSuccess()) {
                    throw new Exception();
                }
                // Sends autoreply to contact
                $mailTemplate = Mage::getModel('core/email_template');
                $mailTemplate->setDesignConfig(array('area' => 'frontend'))
                    ->setReplyTo($post['email'])
                    ->sendTransactional(
                        self::EMAIL_AUTOREPLY_TEMPLATE,
                        Mage::getStoreConfig(self::XML_PATH_EMAIL_SENDER),
                        $post['email'],
                        null,
                        array('data' => $postObject)
                    );

                $translate->setTranslateInline(true);

                // Core Code
                // $mailTemplate = Mage::getModel('core/email_template');
                
                // /* @var $mailTemplate Mage_Core_Model_Email_Template */
                // $mailTemplate->setDesignConfig(array('area' => 'frontend'))
                //     ->setReplyTo($post['email'])
                //     ->sendTransactional(
                //         Mage::getStoreConfig(self::XML_PATH_EMAIL_TEMPLATE),
                //         Mage::getStoreConfig(self::XML_PATH_EMAIL_SENDER),
                //         Mage::getStoreConfig(self::XML_PATH_EMAIL_RECIPIENT),
                //         null,
                //         array('data' => $postObject)
                //     );

                // if (!$mailTemplate->getSentSuccess()) {
                //     throw new Exception();
                // }

                // $translate->setTranslateInline(true);

                Mage::getSingleton('customer/session')->addSuccess(Mage::helper('contacts')->__('Your inquiry was submitted and will be responded to as soon as possible. Thank you for contacting us.'));
                $this->_redirect('*/*/');

                return;
            } catch (Exception $e) {
                $translate->setTranslateInline(true);
                Mage::log($e->getMessage());

                Mage::getSingleton('customer/session')->addError(Mage::helper('contacts')->__('Unable to submit your request. Please, try again later'));
                $this->_redirect('*/*/');
                return;
            }

        } else {
            $this->_redirect('*/*/');
        }
    }

}
