FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["apps/api/SCIP.Api.csproj", "apps/api/"]
RUN dotnet restore "apps/api/SCIP.Api.csproj"
COPY apps/api/ apps/api/
WORKDIR "/src/apps/api"
RUN dotnet build "SCIP.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "SCIP.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SCIP.Api.dll"]
