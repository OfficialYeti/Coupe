using MassTransit;
using MassTransit.ExtensionsDependencyInjectionIntegration;
using MassTransit.Platform.Abstractions;
using Microsoft.Extensions.DependencyInjection;

namespace Coupe.Account.MT
{
	public class Startup : IPlatformStartup
	{
		public void ConfigureBus<TEndpointConfigurator>(
			IBusFactoryConfigurator<TEndpointConfigurator> cfg,
			IBusRegistrationContext ctx) where TEndpointConfigurator : IReceiveEndpointConfigurator
		{
		}

		public void ConfigureMassTransit(
			IServiceCollectionBusConfigurator cfg,
			IServiceCollection svc)
		{
		}
	}
}
