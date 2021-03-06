<?php

require_once( 'EdipostService.php' );

use EdipostService\Client\Builder\ConsignmentBuilder;
use EdipostService\Client\Item;
use EdipostService\EdipostService;


class ConsignmentTest extends PHPUnit_Framework_TestCase {
	private $api;


	public function __construct() {
		$this->api = new EdipostService( '32a2da7ecac520df81e626671ff882a7bdd5d161' );
	}


	/*
	 * Calculate postage
	 */
	public function testCalculatePostage() {
		$builder = new ConsignmentBuilder();

		$consignment = $builder
			->setConsignorID( 3311 )
			->setConsigneeID( 1510077 )
			->setProductID( 8 )
			->setTransportInstructions( '' )
			->setContentReference( '' )
			->setInternalReference( '' )
			->addItem( new Item( 5, 10, 10, 10 ) )
			->build();

		$result = $this->api->calculatePostage( $consignment );

		// Make sure we have at least one shipment item
		$this->assertGreaterThan( 0, count( $result->items->items ) );

		// Make sure all items has a cost
		foreach( $result->items->items as $item ) {
			$this->assertGreaterThan( 1, $item->getCost() );
		}
	}


	/*
	 * Create consignment
	 */
	public function testCreateConsignment() {
		$builder = new ConsignmentBuilder();

		$consignment = $builder
			->setConsignorID( 3311 )
			->setConsigneeID( 1510077 )
			->setProductID( 8 )
			->setTransportInstructions( '' )
			->setContentReference( '' )
			->setInternalReference( '' )
			->addItem( new Item( 5, 10, 10, 10 ) );

		$newConsignment = $this->api->createConsignment( $consignment->build() );

		// Make sure we have a shipment ID and a shipment number
		$this->assertGreaterThan( 1, $newConsignment->id );
		$this->assertEquals( 17, strlen( $newConsignment->shipmentNumber ) );

		// Make sure we have at least one shipment item
		$this->assertGreaterThan( 0, count( $newConsignment->items->items ) );

		// Make sure all items has a shipment item number
		foreach( $newConsignment->items->items as $item ) {
			$this->assertEquals( 18, strlen( $item->getItemNumber() ) );
		}
	}
}

?>