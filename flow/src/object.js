// @flow

type AddressType = {
  street: string,
  city: string,
  state: string,
  zip: number
};

function printAddressLabel(address: AddressType): void {
  console.log(address.street);
  console.log(`${address.city}, ${address.state} ${address.zip}`);
}

const a: AddressType = {
  street: '123 Some Lane',
  city: 'Somewhere',
  state: 'MO',
  country: 'USA',
  zip: 12345
};

printAddressLabel(a);
