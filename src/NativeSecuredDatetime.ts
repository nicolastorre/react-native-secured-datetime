import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getElapsedRealtime(): number;
}

export default TurboModuleRegistry.getEnforcing<Spec>('SecuredDatetime');
