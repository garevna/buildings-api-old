export default {
  buildingName: '',
  buildingType: 'dwelling=,type=,category=,field=',
  status: 'Footprint',
  coordinates: [0, 0],
  address: '',
  addressComponents: {
    number: '',
    street: '',
    city: '',
    state: '',
    postCode: '',
    admin: ''
  },
  footprint: false,
  distanceFromFootprint: 0,
  owner: {
    name: '',
    address: '',
    phone: '',
    email: '',
    contactPerson: ''
  },
  management: {
    name: '',
    address: '',
    phone: '',
    email: '',
    contactPerson: ''
  },
  customerInstallApprovalRequired: true,
  inductionRequired: true,
  difficultyLevel: {
    leadInInstallation: 0,
    backboneInstallation: 0,
    customerInstallation: 0
  },
  infrastructure: {
    type: '',
    leadIn: {
      planned: false,
      installed: false
    },
    backbone: {
      planned: false,
      installed: false
    },
    customerAccessCabling: {
      planned: false,
      installed: false
    },
    gPOinMDF: {
      exist: false,
      planned: false,
      installed: false
    },
    uPSinMDF: {
      planned: false,
      installed: false
    },
    gPOinRisers: {
      exist: false,
      planned: false,
      installed: false
    },
    uPSinRisers: {
      planned: false,
      installed: false
    }
  },
  files: {
    design: '',
    laanInspect: '',
    laanInstall: '',
    scope: '',
    photos: [],
    approoval: ''
  },
  numberOfLevels: 0,
  numberOfDwellings: 0,
  avgFloorHeight: 0,
  levels: [
    {
      plannedRouter: false,
      plannedSplicingBox: false,
      plannedSplitter: false,
      plannedOFTU: false,
      plannedRack: false,
      installedRouter: false,
      installedSplicingBox: false,
      installedSplitter: false,
      installedOFTU: false,
      installedRack: false,
      routerId: ''
    }
  ]
}
