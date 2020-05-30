import {defineTemplateService} from './template-service';

test('Feature Service Definition should id and create method', () => {
  const featureService = defineTemplateService();

  expect(featureService.id).toBeDefined();
  expect(typeof featureService.create).toEqual('function');
});
