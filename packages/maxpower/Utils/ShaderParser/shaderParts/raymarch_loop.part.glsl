SDFResult dist;
bool hit = false;

for( int i = 0; i < ARG1; i++ ) {

	dist = D( rayPos );
	rayPos += dist.d * rayDir * ARG3;

	if( dist.d < ARG2 ) {

		hit = true;
		break;

	}

}
